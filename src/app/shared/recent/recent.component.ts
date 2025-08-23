import { Component, inject, Input, OnInit, Output } from "@angular/core";
import { cardTmpComponent } from "../cardTmp/cardTmp.component";
import { DataService } from "../../shared/services/data.service";
import { ArticleFormData } from "../interfaces/articleFormData";
import { filter,Observable,Observer } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { NavToViewService } from "../services/navToView/nav-to-view.service";
import { RecentCardComponent } from "../recent-card/recent-card.component";
@Component({
    selector:'recent',
    templateUrl:'./recent.component.html',
    styleUrl:'./recent.component.less',
    imports: [cardTmpComponent,AsyncPipe,RecentCardComponent]
})
export class recentComponent implements OnInit{
    // constructor(private dataService:DataService){
    //     this.data$=dataService.data$
    // }
    data$:Observable<ArticleFormData[]>=inject(DataService).data$
    navService=inject(NavToViewService)
    iconName:string='fa-clock-rotate-left'
    formData:ArticleFormData[]=[]
    // ngOnInit(): void {
    //     this.dataService.data$.pipe(filter(data=>data!==null)).subscribe(data=>{
    //         this.formData=data!
    //         console.log(data);
            
    //     })
    // }
    ngOnInit(): void {
        
    }
    // <nz-icon nzType="history" nzTheme="outline" />
    print(){
        console.log(this.formData);
    }
}