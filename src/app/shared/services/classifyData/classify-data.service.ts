import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { classify } from '../../interfaces/classifyData';
@Injectable({
  providedIn: 'root'
})
export class ClassifyDataService {
  private classifyData=new BehaviorSubject<classify[] | null>(null)
  classifyData$=this.classifyData.asObservable()
  constructor() { }
  
  setData(data:classify[] | null){
    this.classifyData.next(data)
  }
  getData(){
    return this.classifyData.getValue()
  }

}
