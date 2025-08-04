import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LayoutComponent } from '../layout/layout.component';
import { bgComponent } from '../background/bg.component';
import { FooterComponent } from "../footer/footer.component";
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
@Component({
  selector: 'app-home',
  imports: [HeaderComponent, LayoutComponent, bgComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  constructor() {

  }
  ngOnInit(): void {
    let smoother = ScrollSmoother.create({
      smooth: 1,
      smoothTouch: 0.1,
      effects: true,
      // normalizeScroll: true
    });
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
  }
}
