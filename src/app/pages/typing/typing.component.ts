import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Stats } from '../../shared/interfaces/Stats';
import { Observable } from 'rxjs';
import { TypingDataService } from '../../shared/services/typingData/typing-data.service';


type CharState = 'pending' | 'correct' | 'incorrect';

interface CharObject {
  char: string;
  state: CharState;
}

interface InputState {
  curPos: number;
  row: number;
  col: number;
  correct: number;
  incorrect: number;
  [prop: string]: unknown;
}

type Line = CharObject[];

@Component({
  selector: 'app-root',
  imports: [CdkDrag],
  templateUrl: './typing.component.html',
  styleUrl: './typing.component.less'
})
export class TypingComponent implements OnInit, OnDestroy {
  title = 'Typing';
  cap_state = false;
  typingData$: Observable<string> | null = null
  initChars = 80;
  words: string[] = []
  line: Line[] = [];

  private initialInputState: InputState = {
    curPos: 0,
    row: 0,
    col: 0,
    correct: 0,
    incorrect: 0,
    lastError: -1
  };

  private initialStats: Stats = {
    cpm: 0,
    accuracy: 0,
    typedChars: 0,
    errors: 0,
    startTime: null,
  };

  inputState: InputState = { ...this.initialInputState };
  spanRef: HTMLCollectionOf<Element> | null = null;
  stats: Stats = { ...this.initialStats };

  elapsedTime = 0;
  private timerInterval: any = null;

  constructor(private typingDataService: TypingDataService) {
    this.typingData$ = typingDataService.typingData$
  }

  get accuracy(): number {
    if (!this.inputState || !this.inputState.curPos) {
      return 100;
    }
    const correctChars = this.inputState.curPos - this.inputState.incorrect;
    const percentage = (correctChars / this.inputState.curPos) * 100;
    return Math.floor(percentage);
  }

  ngOnInit(): void {
    this.typingDataService.loadData()
    this.getData()
    this.setupLines()
  }
  getData() {
    this.typingData$?.subscribe(data => {
      if (data != '') {
        this.words = data.split(' ')
      }
      console.log(data);

    })

  }
  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private setupLines(): void {
    this.line = [];
    let tLine = '';
    let tCharObject: CharObject[] = [];

    // for (let i of this.words) {
    this.typingData$?.subscribe(data => {
      if (data != '') {
        for (let i of data.split(' ')) {
          if ((i + ' ' + tLine).length > this.initChars) {
            tLine.split('').forEach(e => {
              tCharObject.push({ char: e, state: 'pending' });
            });
            this.line.push(tCharObject);
            tLine = '';
            tCharObject = [];
          }
          tLine += i + ' ';
        }
      }
      if (tLine) {
      tLine.split('').forEach(e => {
        tCharObject.push({ char: e, state: 'pending' });
      });
      this.line.push(tCharObject);
    }
      
    })
    

    setTimeout(() => {
      this.spanRef = document.getElementsByClassName('each-char');
      this.spanRef?.item(0)?.classList.add('curChar');
    }, 200);
  }

  handleKeyDown(event: KeyboardEvent): void {
    console.log(this.line);

    let is = this.inputState;
    if (this.isModifierKey(event.key)) {
      return;
    }
    event.preventDefault();

    if (!this.stats.startTime) {
      this.startTimer();
    }

    let { key } = event;

    if (is.row >= this.line.length || is.col >= this.line[is.row].length) {
      // 如果已经输入完成，则停止计时并返回
      if (this.timerInterval) clearInterval(this.timerInterval);
      return;
    }

    if (key === this.line[is.row][is.col].char) {
      this.spanRef?.item(is.curPos)?.classList.remove('curChar');
      if (this.line[is.row][is.col].state !== 'incorrect') {
        this.line[is.row][is.col].state = 'correct';
      }

      is.curPos++;
      is.col++;

      if (is.col >= this.line[is.row].length) {
        is.col = 0;
        is.row++;
      }

      if (is.row < this.line.length) {
        this.spanRef?.item(is.curPos)?.classList.add('curChar');
      } else {
        // 完成所有输入
        if (this.timerInterval) clearInterval(this.timerInterval);
      }

    } else {
      if (is['lastError'] !== is.curPos) {
        is.incorrect++;
        this.stats.errors = is.incorrect;
      }
      is['lastError'] = is.curPos;
      this.line[is.row][is.col].state = 'incorrect';
      // this.spanRef?.item(is.curPos)?.classList.add('incorrect');
    }
    this.stats.typedChars = is.curPos;
  }

  private startTimer(): void {
    this.stats.startTime = new Date();

    this.timerInterval = setInterval(() => {
      if (!this.stats.startTime) {
        clearInterval(this.timerInterval);
        return;
      }
      const elapsedSeconds = (Date.now() - this.stats.startTime.getTime()) / 1000;
      this.elapsedTime = Math.floor(elapsedSeconds);

      if (elapsedSeconds > 0) {
        const correctChars = this.inputState.curPos - this.inputState.incorrect;
        const elapsedMinutes = elapsedSeconds / 60;
        this.stats.cpm = Math.round(correctChars / elapsedMinutes);
      }
    }, 1000);
  }

  public reset(): void {

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerInterval = null;
    this.elapsedTime = 0;

    // 重置光标位置
    const currentCursor = this.spanRef?.item(this.inputState.curPos);
    if (currentCursor) currentCursor.classList.remove('curChar', 'incorrect');

    this.stats = { ...this.initialStats };
    this.inputState = { ...this.initialInputState };

    Array.from(this.spanRef || []).forEach(el => {
      el.classList.remove('incorrect', 'correct');
    });

    this.setupLines();
  }

  isModifierKey = (key: string): boolean => {
    const modifierKeys = [
      'Shift', 'Control', 'Alt', 'AltGraph', 'Meta',
      'CapsLock', 'Tab', 'Escape', 'Fn', 'FnLock',
      'Hyper', 'NumLock', 'ScrollLock', 'Super', 'Symbol',
      'SymbolLock', 'ContextMenu', 'ArrowLeft', 'ArrowRight',
      'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Backspace'
    ];
    return modifierKeys.includes(key);
  };
}
