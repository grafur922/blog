import { Component } from "@angular/core";
import { CategoryComponent } from "../../shared/category/category.component";
import { ArchiveComponent } from "../../shared/archive/archive.component";
import { StatisticsComponent } from "../../shared/statistics/statistics.component";
import { recentComponent } from "../../shared/recent/recent.component";
import { RouterModule } from "@angular/router";
import { ArticleListComponent } from "../article-list/article-list.component";
// import { cardTmpComponent } from "../../shared/cardTmp/cardTmp.component";
@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.less',
    imports: [ RouterModule, CategoryComponent, ArchiveComponent, StatisticsComponent, recentComponent, ArticleListComponent]
})
export class LayoutComponent {
    constructor() {

    }
    articleData=
        {
            articleId:10001,
            articleTitle:'标题',
            articleImg:'',
            articleContent:'内容',
            articleCreateTime:'2025-1-6',
        }
}