import { Component, OnInit } from "@angular/core";
import { cardTmpComponent } from "../cardTmp/cardTmp.component";
import { ArticleFormData } from "../interfaces/articleFormData";
import { DataService } from "../services/data.service";
import { Observable } from "rxjs";
@Component({
    selector:'archive',
    templateUrl:'./archive.component.html',
    imports:[cardTmpComponent],
    styleUrl:'./archive.component.less'
})
export class ArchiveComponent implements OnInit{
    articleData$:Observable<ArticleFormData[] |null>|null=null
    constructor(private articleService:DataService){
        this.articleData$=articleService.data$
    }
    iconName:string='fa-inbox'
    ngOnInit(): void {
        // this.articleService.loadData()
        this.articleData$?.subscribe(res=>{
            console.log(res);
            
        })
    }
}