import { Component, inject, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion'
import { HeaderComponent } from "../../core/header/header.component";
import { ClassifyDataService } from '../../shared/services/classifyData/classify-data.service';
import { AsyncPipe } from '@angular/common';
import {Observable} from 'rxjs'
import { DataService } from '../../shared/services/data.service';
import { classify } from '../../shared/interfaces/classifyData';
@Component({
  selector: 'app-classify-viewer',
  imports: [MatExpansionModule, HeaderComponent,AsyncPipe],
  templateUrl: './classify-viewer.component.html',
  styleUrl: './classify-viewer.component.less'
})
export class ClassifyViewerComponent implements OnInit{
  classifyData$: Observable<classify[] | null>
  // articleData$=inject(DataService).data$
  constructor(private classifyDataService:ClassifyDataService){
    this.classifyData$=this.classifyDataService.classifyData$
  }
  ngOnInit(): void {
    this.classifyDataService.loadData()
    // console.log(this.articleData$);
    console.log(this.classifyData$);
    
  }
  panelOpenState=false
}
