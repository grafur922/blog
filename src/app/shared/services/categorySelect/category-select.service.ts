import { inject, Injectable, } from '@angular/core';
import { CategoryDataService } from '../categoryData/category-data.service';
import { BehaviorSubject, debounceTime, map } from 'rxjs';
import { Category, CategorySelect } from '../../interfaces/Category';


function isCategorySelectArray(data: any): data is CategorySelect[] {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return true;
  const firstItem = data[0];
  return (
    typeof firstItem.categoryId === 'number' &&
    typeof firstItem.categoryName === 'string' &&
    typeof firstItem.select === 'boolean'
  );
}


@Injectable({
  providedIn: 'root'
})
export class CategorySelectService{
  private categoryData$ = inject(CategoryDataService).categoryData$;
  public checkboxSelect$ = new BehaviorSubject<CategorySelect[]>([]);

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    const savedDataString = localStorage.getItem('CHECKBOX_SELECT');

    if (savedDataString) {
      try {
        const parsedData = JSON.parse(savedDataString);
        
        if (isCategorySelectArray(parsedData)) {

          this.checkboxSelect$.next(parsedData);
          return; 
        }
      } catch (error) {
        console.error('Failed to parse CHECKBOX_SELECT from localStorage', error);
      }
    }
    

    this.initializeFromDefault();
  }
  
  private initializeFromDefault(): void {
    this.categoryData$.pipe(
      map((categories: Category[]) => { 
        if (!categories) {
          return [];
        }
        return categories.map(category => ({
          ...category,
          select: true
        }));
      })
    ).subscribe(res => {
      this.checkboxSelect$.next(res);
      this.save(res); 
    });
  }

  save(value: CategorySelect[]): void {
    localStorage.setItem('CHECKBOX_SELECT', JSON.stringify(value));
  }

  updateSelection(itemId: number, isSelected: boolean): void {
    const currentItems = this.checkboxSelect$.getValue();
    if (!currentItems) return;

    const updatedItems = currentItems.map(item =>
      item.categoryId === itemId ? { ...item, select: isSelected } : item 
    );

    this.checkboxSelect$.next(updatedItems);
    // this.checkboxSelect$.pipe(
    //   debounceTime(500)
    // )
    this.save(updatedItems);
  }

}