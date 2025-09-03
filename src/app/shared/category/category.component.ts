import {Component, inject, OnInit} from '@angular/core'
import { cardTmpComponent } from "../cardTmp/cardTmp.component";
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CategoryDataService } from '../services/categoryData/category-data.service';
import { LoggerService } from '../services/Logger/logger.service';
import { Router , RouterModule} from '@angular/router';
import { Category, CategorySelect } from '../interfaces/Category';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatRippleModule} from '@angular/material/core'
import { CategorySelectService } from '../services/categorySelect/category-select.service';
@Component({
    selector:'category',
    templateUrl:'./category.component.html',
    styleUrl:'./category.component.less',
    imports: [cardTmpComponent,RouterModule,AsyncPipe,MatCheckboxModule,MatRippleModule]
})
export class CategoryComponent implements OnInit{
    router=inject(Router)
    iconName:string='fa-list'
    Logger=inject(LoggerService)
    checkBoxService=inject(CategorySelectService)
    checkBoxSelect$=this.checkBoxService.checkboxSelect$
    categoryData$: Observable<Category[] | null>=inject(CategoryDataService).categoryData$
    
    constructor(){
        this.checkBoxSelect$.subscribe(res=>{
            console.log(res);
        }) 
    }
    onSelectionChange(item:CategorySelect,isSelect:boolean){
        this.Logger.log(`'${item.categoryName}' 的状态变为: ${isSelect}`);
        // 调用 Service 的方法去更新数据源
        this.checkBoxService.updateSelection(item.categoryId,isSelect)
    }
    ngOnInit(): void {
    }
    
}