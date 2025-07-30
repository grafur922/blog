import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, throwError,map,of } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ArticleFormData } from '../interfaces/articleFormData';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);

  public data$: Observable<ArticleFormData[]>;

  constructor() {
    this.data$ = this.http.get<ApiResponse<ArticleFormData[]>>('/api/getAll').pipe(
      tap(res => {
        if (res.code !== 1) {
          throw new Error(`API Error: ${res.message}`);
        }
      }),
      map(res => res.data.reverse()),
      catchError(error => {
        console.error('Failed to load article data:', error);
        return of([]);
      }),
      shareReplay(1) 
    );
  }

  // private dataReloader$ = new BehaviorSubject<void>(undefined);
  // this.data$ = this.dataReloader$.pipe(switchMap(() => this.http.get()))
  // public refresh() { this.dataReloader$.next(); }
}