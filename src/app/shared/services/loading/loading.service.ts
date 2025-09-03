import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, from ,BehaviorSubject} from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly _isLoading$ = new BehaviorSubject<boolean>(true)
  public readonly isLoading$: Observable<boolean> = this._isLoading$.asObservable()
  //主页静态资源
  private readonly CRITICAL_IMAGE_URLS = [
    'https://clematis.top/download/image/homeImage/40b042a3e3e94477773dad53c21d033d.jpg',
    'https://clematis.top/download/image/homeImage/4ab6da9f4c1013bbed8b5846dc04149a.jpg'
  ];

  private readonly CRITICAL_FONTS = [
    '1em Agency-Bold-Bg',
    '1em HeadFont'
  ];
  constructor() { }

  hide(): void {
    this._isLoading$.next(false)
  }

  show(): void {
    this._isLoading$.next(true)
  }
  loadCriticalAssets(): Observable<any[] | null> {
    // console.log('Loading critical assets via Observables...');

    const imageObservables$ = this.CRITICAL_IMAGE_URLS.map(url => this.loadImage(url));
    const fontObservables$ = this.CRITICAL_FONTS.map(font => this.loadFont(font));

    const allObservables$ = [...imageObservables$, ...fontObservables$];

    // 如果没有任何资源要加载，返回一个立即完成的 Observable
    if (allObservables$.length === 0) {
      return of([]);
    }
    return forkJoin(allObservables$).pipe(
      tap(()=>this.hide()),
      catchError(error => {
        console.error('An error occurred while loading critical assets:', error);
        this.hide();
        return of(null);
      })
    );
  }

  private loadImage(url: string): Observable<Event | null> {
    return new Observable<Event>(subscriber => {
      const img = new Image();
      img.onload = (event) => {
        subscriber.next(event);
        subscriber.complete(); 
      };
      img.onerror = (error) => {
        subscriber.error(new Error(`Failed to load image: ${url}`));
      };
      img.src = url;
    }).pipe(
      retry(2),
      catchError(error => {
        console.error(error);
        return of(null); // 捕获单个图片加载错误，返回null，不让它破坏整个forkJoin
      })
    );
  }

  private loadFont(font: string): Observable<FontFace[] | null> {
    if (!document.fonts) {
      return of(null);
    }
    return from(document.fonts.load(font)).pipe(
      catchError(error => { 
        console.error(`Failed to load font: ${font}`, error);
        return of(null); 
      })
    );
  }
}
    

