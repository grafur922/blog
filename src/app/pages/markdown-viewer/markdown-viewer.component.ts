import { Component,CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit,effect } from '@angular/core';
import ZeroMd from 'zero-md'
import { HeaderComponent } from '../../core/header/header.component';
import axios from 'axios'
import { LoggerService } from '../../shared/services/Logger/logger.service';
import { FooterComponent } from "../../core/footer/footer.component";
import { recentComponent } from '../../shared/recent/recent.component';
import { CategoryComponent } from "../../shared/category/category.component";
@Component({
  selector: 'app-markdown-viewer',
  imports: [HeaderComponent, FooterComponent, recentComponent, CategoryComponent],
  templateUrl: './markdown-viewer.component.html',
  styleUrl: './markdown-viewer.component.less',
  schemas:[CUSTOM_ELEMENTS_SCHEMA,]
})
export class MarkdownViewerComponent implements OnInit{
  id=input.required<string>()
  Logger=inject(LoggerService)
  url=""
  constructor(){
    if(!customElements.get('zero-md')){
      customElements.define('zero-md',ZeroMd)
    }
    effect(()=>{
      const currentId = this.id(); 
      axios.get(`/api/getUrl?id=${currentId}`).then(res => {
        // this.Logger.log(res.data.data)
        this.url = res.data.data;
      }).catch(res => {
        this.Logger.error(res);
      });
    })
  }
  ngOnInit(): void {
    
  }
  
  
}
