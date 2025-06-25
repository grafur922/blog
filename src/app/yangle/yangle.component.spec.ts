import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YangleComponent } from './yangle.component';

describe('YangleComponent', () => {
  let component: YangleComponent;
  let fixture: ComponentFixture<YangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YangleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
