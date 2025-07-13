import { Component, inject, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion'
import { HeaderComponent } from "../../core/header/header.component";
import { ClassifyDataService } from '../../shared/services/classifyData/classify-data.service';
@Component({
  selector: 'app-classify-viewer',
  imports: [MatExpansionModule, HeaderComponent],
  templateUrl: './classify-viewer.component.html',
  styleUrl: './classify-viewer.component.less'
})
export class ClassifyViewerComponent implements OnInit{
  data=inject(ClassifyDataService)
  constructor(){}
  ngOnInit(): void {
      // console.log(this.data.getData());
      
  }
  panelOpenState=false
}
