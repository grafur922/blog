import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflexesTestComponent } from './reflexes-test.component';

describe('ReflexesTestComponent', () => {
  let component: ReflexesTestComponent;
  let fixture: ComponentFixture<ReflexesTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReflexesTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReflexesTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
