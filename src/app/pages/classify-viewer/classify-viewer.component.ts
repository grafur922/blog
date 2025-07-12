import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion'
import { HeaderComponent } from "../../core/header/header.component";
@Component({
  selector: 'app-classify-viewer',
  imports: [MatExpansionModule, HeaderComponent],
  templateUrl: './classify-viewer.component.html',
  styleUrl: './classify-viewer.component.less'
})
export class ClassifyViewerComponent {
  panelOpenState=false
}
