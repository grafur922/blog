import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { HeaderComponent } from "../../core/header/header.component";
import { CategoryDataService } from '../../shared/services/categoryData/category-data.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { Category } from '../../shared/interfaces/Category';
import { ArticleFormData } from '../../shared/interfaces/articleFormData';
import { NavToViewService } from '../../shared/services/navToView/nav-to-view.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-viewer',
  imports: [MatExpansionModule, HeaderComponent, AsyncPipe],
  templateUrl: './category-viewer.component.html',
  styleUrl: './category-viewer.component.less'
})
export class CategoryViewerComponent implements OnInit {
  categoryData$: Observable<Category[] | null>;
  articleData$: Observable<ArticleFormData[] | null>;
  navService = inject(NavToViewService);

  expandedCategoryName: string | null = null;

  constructor(
    private categoryDataService: CategoryDataService,
    private articleDataService: DataService,
    private route: ActivatedRoute
  ) {
    this.categoryData$ = this.categoryDataService.categoryData$;
    this.articleData$ = this.articleDataService.data$;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.expandedCategoryName = this.route.snapshot.fragment;
    }, 300);
    // this.articleDataService.loadData();
  }

  handlePanelClosed(categoryName: string): void {
    if (this.expandedCategoryName === categoryName) {
      this.expandedCategoryName = null;
    }
  }
}