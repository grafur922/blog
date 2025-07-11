import { Component, inject, Input, OnInit, Output } from "@angular/core";
import { cardTmpComponent } from "../cardTmp/cardTmp.component";
import { DataService } from "../../shared/services/data.service";
import { ArticleFormData } from "../interfaces/articleFormData";
import { filter } from "rxjs";
import { NavToViewService } from "../services/navToView/nav-to-view.service";
@Component({
    selector:'recent',
    templateUrl:'./recent.component.html',
    styleUrl:'./recent.component.less',
    imports: [cardTmpComponent]
})
export class recentComponent implements OnInit{
    constructor(private dataService:DataService){}
    navService=inject(NavToViewService)
    iconName:string='fa-clock-rotate-left'
    formData:ArticleFormData[]=[]
    ngOnInit(): void {
        this.dataService.data$.pipe(filter(data=>data!==null)).subscribe(data=>{
            this.formData=data!
        })
    }
    // <nz-icon nzType="history" nzTheme="outline" />
    print(){
        console.log(this.formData);
    }
}