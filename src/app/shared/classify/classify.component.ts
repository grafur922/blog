import {Component, inject, OnInit} from '@angular/core'
import { cardTmpComponent } from "../cardTmp/cardTmp.component";
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ClassifyDataService } from '../../shared/services/classifyData/classify-data.service';
import { LoggerService } from '../services/Logger/logger.service';
import { Router , RouterModule} from '@angular/router';
import { classify } from '../interfaces/classifyData';
@Component({
    selector:'classify',
    templateUrl:'./classify.component.html',
    styleUrl:'./classify.component.less',
    imports: [cardTmpComponent,RouterModule,AsyncPipe]
})
export class ClassifyComponent implements OnInit{
    classifyData$: Observable<classify[] | null>
    constructor(public data:ClassifyDataService,private classifyDataService: ClassifyDataService){
        this.classifyData$ = this.classifyDataService.classifyData$;
    }
    iconName:string='fa-list'
    router=inject(Router)
    Logger=inject(LoggerService)
    ngOnInit(): void {
        this.classifyDataService.loadData();
        // console.log(this.classifyData$);
    }
    
}