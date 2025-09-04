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
import {MatDividerModule} from '@angular/material/divider'
import { CategorySelectService } from '../../shared/services/categorySelect/category-select.service';
import { CategorySelect } from '../../shared/interfaces/Category';
import { AnimationCallbackEvent } from '@angular/core';
@Component({
  selector: 'app-article-list',
  imports: [articleCardComponent, AsyncPipe, MatPaginatorModule, MatDividerModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.less'
})
export class ArticleListComponent {
  articleData$:Observable<ArticleFormData[]>
  alen:number=0
  categoryArray:CategorySelect[]=[]
  checkboxSelect$=inject(CategorySelectService).checkboxSelect$
  constructor(private dataService:DataService,private router:Router) { 
    this.articleData$=this.dataService.data$
    this.articleData$.subscribe(item=>{
      this.alen=item?.length===undefined?0:item.length
    })
    this.checkboxSelect$.subscribe(res=>{
      this.categoryArray=res
    })
  }
  navService=inject(NavToViewService)
  Logger=inject(LoggerService)

  visible(categoryId:number):boolean{
    // console.log(this.categoryArray);
    
    for(let i of this.categoryArray){
      if(i.categoryId==categoryId){

        return i.select
      }
    }
    // for(let i=0;i<this.categoryArray.length;i++){
    //   if(this.categoryArray[i].categoryId==)
    // }
    return true
  }

  view(id:string){
    this.router.navigate(['/view/'+id])
  }
  onEnter(event:AnimationCallbackEvent){
    console.log(event);
    
  }
}
