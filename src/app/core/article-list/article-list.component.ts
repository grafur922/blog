import { Component, inject, OnInit } from '@angular/core';
import axios from 'axios'
import { ArticleFormData } from '../../shared/interfaces/articleFormData';
import { articleCardComponent } from '../../shared/articleCard/articleCard.component';
import { DataService } from '../../shared/services/data.service';
import { LoggerService } from '../../shared/services/Logger/logger.service';
import {Router} from '@angular/router'
import { NavToViewService } from '../../shared/services/navToView/nav-to-view.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator'
@Component({
  selector: 'app-article-list',
  imports: [articleCardComponent,AsyncPipe,MatPaginatorModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.less'
})
export class ArticleListComponent implements OnInit{
  articleData$:Observable<ArticleFormData[]| null>
  constructor(private dataService:DataService,private router:Router) { 
    this.articleData$=this.dataService.data$
  }
  navService=inject(NavToViewService)
  formData:ArticleFormData[]=[]
  Logger=inject(LoggerService)
  ngOnInit(): void {
    // this.dataService.loadData()
  }
  view(id:string){
    this.router.navigate(['/view/'+id])
  }
}
