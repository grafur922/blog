import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs'
import { ArticleFormData } from '../interfaces/articleFormData';
import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
  private articleFormData = new BehaviorSubject<ArticleFormData[] | null>(null);
  data$: Observable<ArticleFormData[] | null> = this.articleFormData.asObservable();

  loadData() {
    if (this.articleFormData.value === null) {
      axios.get('/api/getAll').then(res => {
        if (res.data.code === 1) {
          this.articleFormData.next(res.data.data)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }


}
