import { Component, inject, OnInit } from '@angular/core';
import {MatExpansionModule,MatAccordionTogglePosition} from '@angular/material/expansion'
import { HeaderComponent } from "../../core/header/header.component";
import { ClassifyDataService } from '../../shared/services/classifyData/classify-data.service';
import { AsyncPipe } from '@angular/common';
import {Observable} from 'rxjs'
import { DataService } from '../../shared/services/data.service';
import { classify } from '../../shared/interfaces/classifyData';
import { ArticleFormData } from '../../shared/interfaces/articleFormData';
import { NavToViewService } from '../../shared/services/navToView/nav-to-view.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-classify-viewer',
  imports: [MatExpansionModule, HeaderComponent,AsyncPipe],
  templateUrl: './classify-viewer.component.html',
  styleUrl: './classify-viewer.component.less'
})
export class ClassifyViewerComponent implements OnInit{
  classifyData$: Observable<classify[] | null>;
  articleData$: Observable<ArticleFormData[] | null>;
  navService=inject(NavToViewService)
  constructor(private classifyDataService:ClassifyDataService,private articleDataService:DataService){
    this.classifyData$=this.classifyDataService.classifyData$
    this.articleData$=this.articleDataService.data$
  }
  ngOnInit(): void {
    this.classifyDataService.loadData()
    this.articleDataService.loadData()
  }
  panelOpenState=false
}
