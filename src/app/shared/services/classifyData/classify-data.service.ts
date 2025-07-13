import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { classify } from '../../interfaces/classifyData';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ClassifyDataService {
  private classifyData = new BehaviorSubject<classify[] | null>(null);
  classifyData$: Observable<classify[] | null> = this.classifyData.asObservable();

  constructor() { }
  loadData(): void {

    if (this.classifyData.value === null) {
      axios.get('/api/getClassify').then(res => {
        this.classifyData.next(res.data.data);
      }).catch(err => {
        console.error('Failed to get classify data', err);
        this.classifyData.next(null);
      });
    }
  }
}