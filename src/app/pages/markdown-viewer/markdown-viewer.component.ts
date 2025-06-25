import { Component,CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit } from '@angular/core';
import ZeroMd from 'zero-md'
import { HeaderComponent } from '../../core/header/header.component';
import axios from 'axios'
import { LoggerService } from '../../shared/services/Logger/logger.service';
@Component({
  selector: 'app-markdown-viewer',
  imports: [HeaderComponent],
  templateUrl: './markdown-viewer.component.html',
  styleUrl: './markdown-viewer.component.less',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MarkdownViewerComponent implements OnInit{
  id=input('id')
  Logger=inject(LoggerService)
  url=""
  constructor(){
    if(!customElements.get('zero-md')){
      customElements.define('zero-md',ZeroMd)
    }
  }
  ngOnInit(): void {
    axios.get(`/api/getUrl?id=${this.id()}`).then(res=>{
      // this.Logger.log(res.data.data)
      this.url=res.data.data
    }).catch(res=>{
      this.Logger.error(res)
    })
  }
}
