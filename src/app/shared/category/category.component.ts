import {Component, inject, OnInit} from '@angular/core'
import { cardTmpComponent } from "../cardTmp/cardTmp.component";
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CategoryDataService } from '../services/categoryData/category-data.service';
import { LoggerService } from '../services/Logger/logger.service';
import { Router , RouterModule} from '@angular/router';
import { Category } from '../interfaces/Category';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatRippleModule} from '@angular/material/core'
@Component({
    selector:'category',
    templateUrl:'./category.component.html',
    styleUrl:'./category.component.less',
    imports: [cardTmpComponent,RouterModule,AsyncPipe,MatCheckboxModule,MatRippleModule]
})
export class CategoryComponent implements OnInit{
    classifyData$: Observable<Category[] | null>
    constructor(public data:CategoryDataService,private categoryDataService: CategoryDataService){
        this.classifyData$ = this.categoryDataService.categoryData$;
    }
    iconName:string='fa-list'
    router=inject(Router)
    Logger=inject(LoggerService)
    ngOnInit(): void {
        // this.categoryDataService.loadData();
        // console.log(this.classifyData$);
    }
    
}