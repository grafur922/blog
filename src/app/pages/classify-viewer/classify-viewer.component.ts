import { Component, inject, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion'
import { HeaderComponent } from "../../core/header/header.component";
import { ClassifyDataService } from '../../shared/services/classifyData/classify-data.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-classify-viewer',
  imports: [MatExpansionModule, HeaderComponent,AsyncPipe],
  templateUrl: './classify-viewer.component.html',
  styleUrl: './classify-viewer.component.less'
})
export class ClassifyViewerComponent implements OnInit{
  classifyData$=inject(ClassifyDataService).classifyData$
  constructor(){}
  ngOnInit(): void {
    console.log(this.classifyData$);
    
  }
  panelOpenState=false
}
