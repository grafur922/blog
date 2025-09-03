import { ChangeDetectionStrategy, Component, computed, inject, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormData } from '../../shared/interfaces/articleFormData';
import { articleCardComponent } from '../../shared/articleCard/articleCard.component';
import { DataService } from '../../shared/services/data.service';
import { LoggerService } from '../../shared/services/Logger/logger.service';
import { Router } from '@angular/router'
import { NavToViewService } from '../../shared/services/navToView/nav-to-view.service';
import { Observable, of, Subject, Subscription, bufferTime, asapScheduler, filter, observeOn, asyncScheduler, interval, bufferToggle, timer, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
<<<<<<< HEAD
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatDividerModule } from '@angular/material/divider'
import { CategorySelectService } from '../../shared/services/categorySelect/category-select.service';
import { CategorySelect } from '../../shared/interfaces/Category';
import { AnimationCallbackEvent } from '@angular/core';
import gsap from 'gsap'
import CSSPlugin from 'gsap/CSSPlugin';
gsap.registerPlugin(CSSPlugin)

=======
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatDividerModule} from '@angular/material/divider'
import { CategorySelectService } from '../../shared/services/categorySelect/category-select.service';
import { CategorySelect } from '../../shared/interfaces/Category';
>>>>>>> d5ac369 (refactor(category): implement checkbox selection for categories and update related components)
@Component({
  selector: 'app-article-list',
  imports: [articleCardComponent, AsyncPipe, MatPaginatorModule, MatDividerModule, CommonModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.less',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent implements OnDestroy, OnInit {
  articleData$: Observable<ArticleFormData[]> = inject(DataService).data$
  categoryArray: CategorySelect[] = []
  checkboxSelect$ = inject(CategorySelectService).checkboxSelect$
  leaveTl = gsap.timeline()
  navService = inject(NavToViewService)
  Logger = inject(LoggerService)
  
  private leaveTrigger$ = new Subject<AnimationCallbackEvent>();
  private enterTrigger$ = new Subject<AnimationCallbackEvent>();
  private destroy$ = new Subject<void>();
  private leaveSubscription!: Subscription;
  private enterSubscription!: Subscription;

  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      this.leaveSubscription = this.leaveTrigger$.pipe(
        bufferTime(100, asapScheduler),
        filter(events => events.length > 0), 
        takeUntil(this.destroy$)
      ).subscribe({
        next: (leavingElements: AnimationCallbackEvent[]) => {
          this.zone.run(() => {
            this.animateLeavingBatch(leavingElements);
          });
        },
        error: (error) => {
          this.Logger.error('Animation batch processing error:', error);
        }
      });
      this.enterSubscription = this.enterTrigger$.pipe(
        bufferTime(100, asapScheduler),
        filter(events => events.length > 0), 
        takeUntil(this.destroy$)
      ).subscribe({
        next: (enteringElements: AnimationCallbackEvent[]) => {
          this.zone.run(() => {
            this.animateEnteringBatch(enteringElements);
          });
        },
        error: (error) => {
          this.Logger.error('Animation batch processing error:', error);
        }
      });
    });

    this.checkboxSelect$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.categoryArray = res;
    });
  }

  ngOnInit(): void {
    // this.checkboxSelect$.subscribe(res => {
    //   console.log(res);
    // })
  }

  visible(categoryId: number): boolean {
    for (let i of this.categoryArray) {
      if (i.categoryId == categoryId) {
        return i.select
      }
    }
    return false
  }

  onLeave(event: AnimationCallbackEvent) {
    this.leaveTrigger$.next(event);
  }

  onEnter(event: AnimationCallbackEvent) {
    console.log('onenter');
    
    this.enterTrigger$.next(event);
  }



  private animateLeavingBatch(eventsToComplete: AnimationCallbackEvent[]) {
    const targets = eventsToComplete.map(e => e.target);
    this.zone.runOutsideAngular(() => {
      gsap.timeline({
        onComplete: () => {
          this.zone.run(() => {
            eventsToComplete.forEach(e => e.animationComplete());
          });
        }
      }).fromTo(targets, {
        opacity: 0.4, 
        // height: 'auto',
      }, {
        opacity: 0,
        height: 0,
        duration: 0.7,
        ease: 'power3.out'
      });
    });
  }

  private animateEnteringBatch(eventsToComplete: AnimationCallbackEvent[]) {
    const targets = eventsToComplete.map(e => e.target);
    this.zone.runOutsideAngular(() => {
      gsap.timeline({
        onComplete: () => {
          this.zone.run(() => {
            eventsToComplete.forEach(e => e.animationComplete());
          });
        }
      }).fromTo(targets,{
        height: 0,
        opacity:0,
      }, {
        height: 251,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.in'
      });
    });
  }

  ngOnDestroy() {
    // this.destroy$.next();
    // this.destroy$.complete();
    // if (this.leaveSubscription) {
    //   this.leaveSubscription.unsubscribe();
    // }
    // if (this.enterSubscription) {
    //   this.enterSubscription.unsubscribe();
    // }

  }
}
