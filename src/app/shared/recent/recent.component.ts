import { Component, inject, Input, OnInit, Output } from "@angular/core";
import { cardTmpComponent } from "../cardTmp/cardTmp.component";
import { DataService } from "../../shared/services/data.service";
import { ArticleFormData } from "../interfaces/articleFormData";
import { filter,Observable,Observer } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { NavToViewService } from "../services/navToView/nav-to-view.service";
import { RecentCardComponent } from "../recent-card/recent-card.component";
import { Router } from "@angular/router";
@Component({
    selector:'recent',
    templateUrl:'./recent.component.html',
    styleUrl:'./recent.component.less',
    imports: [cardTmpComponent,AsyncPipe,RecentCardComponent]
})
export class recentComponent{
    constructor(){}
    data$:Observable<ArticleFormData[]>=inject(DataService).data$
    navService=inject(NavToViewService)
    iconName:string='fa-clock-rotate-left'
    formData:ArticleFormData[]=[]
    router=inject(Router)
    // ngOnInit(): void {
    //     this.dataService.data$.pipe(filter(data=>data!==null)).subscribe(data=>{
    //         this.formData=data!
    //         console.log(data);
            
    //     })
    // }
    navToView(id:string|undefined){
        if(id){
            this.navService.view(id)
        }
        else{
            // this.router.navigateByUrl('/')
            this.navService.view('9299')
        }
    }
    print(){
        console.log(this.formData);
    }
}