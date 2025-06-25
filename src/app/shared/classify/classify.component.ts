import {Component, inject, OnInit} from '@angular/core'
import { cardTmpComponent } from "../cardTmp/cardTmp.component";
import axios from 'axios'
import { ClassifyDataService } from '../../shared/services/classifyData/classify-data.service';
import { LoggerService } from '../services/Logger/logger.service';
@Component({
    selector:'classify',
    templateUrl:'./classify.component.html',
    styleUrl:'./classify.component.less',
    imports: [cardTmpComponent]
})
export class ClassifyComponent implements OnInit{
    constructor(public data:ClassifyDataService){}
    iconName:string='fa-list'
    Logger=inject(LoggerService)
    ngOnInit(): void {
        axios.get('/api/getClassify').then(res=>{
            // res.data.data.forEach((item:any)=>{
            //     this.data.setData(item)
            // })
            this.data.setData(res.data.data)
            // console.log(res.data.data);
            
            this.Logger.log(this.data.getData())
            
        })
    }
    
}