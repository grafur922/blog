import { Inject, Injectable } from '@angular/core';
import {Logger} from '../../interfaces/Logger'
import { ENV } from '../../../token';
@Injectable({
  providedIn: 'root'
})
export class LoggerService implements Logger{
  private isProd: boolean;
  constructor(@Inject(ENV) private env:string) { 
    
    this.isProd = this.env === 'PRO';
  }
  log(...args:any){
    if (!this.isProd) {
      console.log(...args)
    }
  }
  warn(...args:any){
    if (!this.isProd) {
      console.warn(...args)
    }
  }
  error(...args:any){
    if (!this.isProd) {
      console.error(...args)
    }
  }
}
