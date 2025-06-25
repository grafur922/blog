import { Component, inject, OnInit } from '@angular/core';
import axios from 'axios'
import { ArticleFormData } from '../../shared/interfaces/articleFormData';
import { articleCardComponent } from '../../shared/articleCard/articleCard.component';
import { DataService } from '../../shared/services/data.service';
import { LoggerService } from '../../shared/services/Logger/logger.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-article-list',
  imports: [articleCardComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.less'
})
export class ArticleListComponent implements OnInit{
  constructor(private dataService:DataService,private router:Router) { 

  }
  formData:ArticleFormData[]=[]
  Logger=inject(LoggerService)
  ngOnInit(): void {
    axios.get('/api/getAll').then(res=>{
      if(res.data.code===1){
        this.formData=res.data.data
        this.dataService.setdata(this.formData)
        this.Logger.log(res.data)
      }
      else{
        console.log(res.data.msg)
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  view(id:string){
    this.router.navigate(['/view/'+id])
  }
}
