import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface WheelOption {
  id: number;
  title: string;
  color: string;
}

interface WheelSegment extends WheelOption {
  startAngle: number;
  endAngle: number;
  midAngle: number;
  clipPath: string;
  contentTransform: string;
}

const DEFAULT_COLORS = [
  '#5264AE',
  '#F9A826',
  '#E94F37',
  '#2A9D8F',
  '#FF66C4',
  '#8F44FD',
  '#00BFA6',
  '#F15BB5'
];

const DEFAULT_OPTIONS: WheelOption[] = [
  { id: 1, title: 'Option 1', color: DEFAULT_COLORS[0] },
  { id: 2, title: 'Option 2', color: DEFAULT_COLORS[1] },
  { id: 3, title: 'Option 3', color: DEFAULT_COLORS[2] },
  { id: 4, title: 'Option 4', color: DEFAULT_COLORS[3] }
];

const STORAGE_KEY = 'decide-wheel-options';
const STORAGE_TITLE_KEY = 'decide-wheel-title';

@Component({
  selector: 'app-decide',
  imports: [CommonModule, FormsModule],
  templateUrl: './decide.component.html',
  styleUrl: './decide.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecideComponent implements OnDestroy {
  private readonly storage = obtainStorage();
  private nextId = DEFAULT_OPTIONS.length + 1;
  private spinTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly spinDurationMs = 4500;

  readonly title = signal('');
  readonly options = signal<WheelOption[]>(this.restoreOptions());
  readonly rotation = signal(0);
  readonly isSpinning = signal(false);
  readonly selectedIndex = signal<number | null>(null);

  readonly segmentAngle = computed(() => {
    const length = this.options().length;
    return length > 0 ? 360 / length : 360;
  });

  saveTitle(): void {
    if (!isStorageAvailable(this.storage)) {
      return;
    }

    try {
      this.storage.setItem(STORAGE_TITLE_KEY, this.title());
    } catch (error) {
      console.error('Failed to save decide wheel title:', error);
    }
  }

  readonly segments = computed<WheelSegment[]>(() => {
    const options = this.options();
    if (!options.length) {
      return [];
    }

    const segmentAngle = this.segmentAngle();
    const baseAngle = -segmentAngle / 2;

    return options.map((option, index) => {
      const startAngle = baseAngle + index * segmentAngle;
      const endAngle = startAngle + segmentAngle;
      const midAngle = (startAngle + endAngle) / 2;

      return {
        ...option,
        startAngle,
        endAngle,
        midAngle,
        clipPath: buildSectorClipPath(startAngle, endAngle),
        contentTransform: buildLabelTransform(midAngle, segmentAngle)
      };
    });
  });

  addOption(): void {
    this.options.update((current) => {
      const color = this.pickNextColor(current);
      return [
        ...current,
        {
          id: this.nextId++,
          title: `Option ${this.nextId - 1}`,
          color
        }
      ];
    });
    this.persistOptions();
  }

  removeOption(id: number): void {
    this.options.update((current) => current.filter((option) => option.id !== id));
    if (this.options().length === 0) {
      this.rotation.set(0);
      this.selectedIndex.set(null);
    }
    this.persistOptions();
  }

  updateTitle(id: number, title: string): void {
    this.options.update((current) =>
      current.map((option) =>
        option.id === id
          ? {
              ...option,
              title: title.trim()
            }
          : option
      )
    );
    this.persistOptions();
  }

  updateColor(id: number, color: string): void {
    this.options.update((current) =>
      current.map((option) => {
        if (option.id !== id) {
          return option;
        }

        const nextColor = color.trim()
          ? color
          : this.pickNextColor(current.filter((item) => item.id !== id));

        return {
          ...option,
          color: nextColor
        };
      })
    );
    this.persistOptions();
  }

  spinWheel(): void {
    if (this.isSpinning()) {
      return;
    }

    const segments = this.segments();
    if (!segments.length) {
      return;
    }

    const targetIndex = Math.floor(Math.random() * segments.length);
    const segment = segments[targetIndex];
    const extraTurns = 5 + Math.floor(Math.random() * 3);
    const maxOffset = Math.max(0, this.segmentAngle() / 2 - 2);
    const offset = maxOffset === 0 ? 0 : (Math.random() * 2 - 1) * maxOffset;
    const targetRotation = this.rotation() + extraTurns * 360 - (segment.midAngle + offset);

    this.selectedIndex.set(targetIndex);
    this.isSpinning.set(true);
    this.rotation.set(targetRotation);

    if (this.spinTimer) {
      clearTimeout(this.spinTimer);
    }

    this.spinTimer = setTimeout(() => {
      this.isSpinning.set(false);
      this.spinTimer = null;
    }, this.spinDurationMs);
  }

  ngOnDestroy(): void {
    if (this.spinTimer) {
      clearTimeout(this.spinTimer);
      this.spinTimer = null;
    }
  }

  private pickNextColor(existing: WheelOption[]): string {
    const usedColors = new Set(existing.map((option) => option.color));
    const available = DEFAULT_COLORS.find((color) => !usedColors.has(color));
    if (available) {
      return available;
    }

    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue} 70% 55%)`;
  }

  private restoreOptions(): WheelOption[] {
    
    if (!isStorageAvailable(this.storage)) {
      return [...DEFAULT_OPTIONS];
    }

    try {
      const title = this.storage.getItem(STORAGE_TITLE_KEY);
      if (title) {
        this.title.set(title);
      }
      const raw = this.storage.getItem(STORAGE_KEY);
      if (!raw) {
        return [...DEFAULT_OPTIONS];
      }

      const parsed = JSON.parse(raw) as WheelOption[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return [...DEFAULT_OPTIONS];
      }

      this.nextId = parsed.reduce((acc, option) => Math.max(acc, option.id), 0) + 1;
      return parsed.map((option) => ({
        ...option,
        title: option.title || `Option ${option.id}`,
        color: option.color || this.pickNextColor(parsed)
      }));
    } catch (error) {
      console.error('Failed to restore decide wheel options:', error);
      return [...DEFAULT_OPTIONS];
    }
  }

  private persistOptions(): void {
    if (!isStorageAvailable(this.storage)) {
      return;
    }

    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(this.options()));
    } catch (error) {
      console.error('Failed to persist decide wheel options:', error);
    }
  }
}

function buildSectorClipPath(startAngle: number, endAngle: number): string {
  const points: string[] = ['50% 50%'];
  const sweep = endAngle - startAngle;
  const stepCount = Math.max(1, Math.ceil(Math.abs(sweep) / 6));
  const step = sweep / stepCount;

  for (let i = 0; i <= stepCount; i++) {
    const angle = startAngle + step * i;
    points.push(polarToPercent(angle));
  }

  return `polygon(${points.join(', ')})`;
}

function polarToPercent(angleDeg: number): string {
  const radians = (angleDeg * Math.PI) / 180;
  const x = 50 + 50 * Math.sin(radians);
  const y = 50 - 50 * Math.cos(radians);
  return `${x.toFixed(3)}% ${y.toFixed(3)}%`;
}

function buildLabelTransform(midAngle: number, segmentAngle: number): string {
  const normalized = Number.isFinite(midAngle) ? midAngle : 0;
  const inverse = -normalized;
  // const radius = clamp(78 + (120 - segmentAngle) * 0.18, 70, 92);
  return `translate(-50%, -50%) rotate(${normalized}deg) translate(0, -${600}%) rotate(${inverse}deg)`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function obtainStorage(): Storage | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  try {
    const { localStorage } = window;
    const testKey = '__decide-storage-check__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return localStorage;
  } catch {
    return null;
  }
}

function isStorageAvailable(storage: Storage | null): storage is Storage {
  if (!storage) {
    return false;
  }

  return true;
}
