import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsCardTemplateComponent } from './tools-card-template.component';

describe('ToolsCardTemplateComponent', () => {
  let component: ToolsCardTemplateComponent;
  let fixture: ComponentFixture<ToolsCardTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsCardTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsCardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
