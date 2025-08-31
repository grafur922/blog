import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap,of, shareReplay } from 'rxjs';
import { Category } from '../../interfaces/Category';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {
  private http = inject(HttpClient)

  public categoryData$: Observable<Category[]>;
  constructor() {
    this.categoryData$ = this.http.get<ApiResponse<Category[]>>('/api/getCategory').pipe(
      tap(res => {
        if (res.code !== 1) {
          throw new Error(`API Error: ${res.message}`)
        }
      }),
      map(res => res.data),
      catchError(error => {
        console.error('Failed to load category data:', error);
        return of([]);
      }),
      shareReplay(1)
    )
  }
}