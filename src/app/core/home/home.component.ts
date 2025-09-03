import { AfterViewInit, Component, ElementRef, inject, OnInit, viewChild, NgZone } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LayoutComponent } from '../layout/layout.component';
import { bgComponent } from '../background/bg.component';
import { FooterComponent } from "../footer/footer.component";
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/all';
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";
import { LoadingService } from '../../shared/services/loading/loading.service';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
@Component({
  selector: 'app-home',
  imports: [HeaderComponent, LayoutComponent, bgComponent, FooterComponent, LoadingScreenComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit, AfterViewInit {
  loading = inject(LoadingService)
  ngZone = inject(NgZone)
  isLoading = true
  home = viewChild<ElementRef<HTMLDivElement>>('home')
  aniStart:ReturnType<typeof setTimeout>|null=null
  constructor() {
    this.loading.loadCriticalAssets().subscribe(res => {
      this.isLoading = false
      this.ngZone.runOutsideAngular(() => {
        this.aniStart=setTimeout(() => {
          this.startScrollAni()
        }, 100);
      })

    })
    this.loading.isLoading$.subscribe(res => {
    })
    // this.loading.isLoading$.subscribe(res=>{
    //   console.log('loading state is ' + res);

    // })
  }
  startScrollAni() {
    gsap.to('.top', {
      scrollTrigger: {
        trigger: '.top',
        start: 'top top',
        end: 'bottom top',
        pin: ".top",
        pinSpacing: false,
        // markers:true
      },
      duration: 1
    });
    if(this.aniStart){
      clearTimeout(this.aniStart)
    }
  }


  ngAfterViewInit(): void {

  }
  show() {

  }
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      let smoother = ScrollSmoother.create({
        smooth: 1,
        smoothTouch: 0.1,
        effects: true,
        // normalizeScroll: true
      });
    })


    // (new Promise).catch(res=>location.href(''))
  }
}
