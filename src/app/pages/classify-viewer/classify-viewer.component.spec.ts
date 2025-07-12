import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyViewerComponent } from './classify-viewer.component';

describe('ClassifyViewerComponent', () => {
  let component: ClassifyViewerComponent;
  let fixture: ComponentFixture<ClassifyViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassifyViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassifyViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
