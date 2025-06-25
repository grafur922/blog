import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseEffectComponent } from './mouse-effect.component';

describe('MouseEffectComponent', () => {
  let component: MouseEffectComponent;
  let fixture: ComponentFixture<MouseEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouseEffectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MouseEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
