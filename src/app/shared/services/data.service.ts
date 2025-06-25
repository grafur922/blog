import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import { ArticleFormData } from '../interfaces/articleFormData';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
  private articleFormData = new BehaviorSubject<ArticleFormData[]|null>(null);
  data$=this.articleFormData.asObservable();

  setdata(data:ArticleFormData[]|null){
    this.articleFormData.next(data); 
  }
  

}
