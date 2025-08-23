import { Component, OnInit, AfterViewInit, OnDestroy, inject } from "@angular/core";
import { gsap } from 'gsap'
import { NgZone } from "@angular/core";
@Component({
  selector: 'bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.less'],
  // host:{
  //   '(mousemove)':'updateEye($event)'
  // }
})
export class bgComponent implements OnInit {
  constructor() {

  }
  ngZone=inject(NgZone)
  ngOnInit(): void {
    const tl = gsap.timeline()
    this.ngZone.runOutsideAngular(()=>{
      tl.fromTo(".rp", {
      y: 500,
      x: 100,
      rotation: 20,
    }, {
      y: 0,
      x: 0,
      rotation: 0,
      ease: "power1.out"
    }, "<0.2").fromTo(".lp", {
      y: 450,
      x: -150,

    }, {
      y: 0,
      x: 0,
      ease: "power1.out"
    }, "<0.2").fromTo(".bgTitle", {
      y: -500,
      rotation: 30
    }, {
      y: 0,
      rotation: 0
    })
    })
    
  }
}
