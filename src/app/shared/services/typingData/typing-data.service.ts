import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import axios from 'axios'
@Injectable({
  providedIn: 'root'
})
export class TypingDataService {
  private typingData=new BehaviorSubject<string>('')
  typingData$:Observable<string>=this.typingData.asObservable()
  constructor() { }
  loadData(words:number=50,upper:boolean=false){
    if(this.typingData.value===''){
      axios.post('/api/getSentence',{words,upper}).then(res=>{
        if(res.data.data.length<20){
          this.loadData()
        }
        else{
          this.typingData.next(res.data.data)
        }
      }).catch(res=>{
        console.error(res);
      })
    }
  }
}
