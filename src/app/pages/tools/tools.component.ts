import { AfterContentInit, Component, ElementRef, OnDestroy, inject, OnInit, viewChild } from '@angular/core';
import { ToolsCardTemplateComponent } from "../../shared/tools-card-template/tools-card-template.component";
import { TOOLS_TOKEN } from '../../token';
import { navConfig } from '../../shared/interfaces/navConfig';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { LoggerService } from '../../shared/services/Logger/logger.service';
import { Router } from '@angular/router';
import { DecideComponent } from "../decide/decide.component";
import { HeaderComponent } from "../../core/header/header.component";
import { FooterComponent } from "../../core/footer/footer.component";
import { NgZone } from '@angular/core';
type pConfig = Pick<navConfig, 'url' | 'enable'>
gsap.registerPlugin(ScrollTrigger,ScrollSmoother)
@Component({
  selector: 'app-tools',
  imports: [ToolsCardTemplateComponent, DecideComponent, HeaderComponent, FooterComponent],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.less'
})
export class ToolsComponent implements OnInit,AfterContentInit, OnDestroy {
  urlToken = inject<navConfig[]>(TOOLS_TOKEN)
  map = new Map<string, pConfig>()
  Logger = inject(LoggerService)
  router = inject(Router)
  wrapper=viewChild<ElementRef<HTMLDivElement>>('wrapper')
  cardbox=viewChild<ElementRef<HTMLDivElement>>('cardbox')
  distance:number=0
  ngZone = inject(NgZone)
  horizontalTween: any
  private _resizeHandler = () => ScrollTrigger.refresh()
  ngOnInit(): void {
    // this.ngZone.runOutsideAngular(() => {
    //   ScrollSmoother.create({
    //     smooth: 1,
    //     smoothTouch: 0.1,
    //     effects: true,
    //     // normalizeScroll: true
    //   });
    // })
    const cardBoxElement = this.cardbox()?.nativeElement;
    this.urlToken.forEach(e => {
      this.map.set(e.name, { url: e.url, enable: e.enable === false ? false : true })
    })
    const nav = document.querySelectorAll('app-tools-card-template')
    nav.forEach(e => {
      let name = e.getAttribute('name') ?? ''
      if (this.map.has(name)) {
        let na = this.map.get(name)
        this.Logger.log(na)
        if (na?.enable !== false) {
          e.addEventListener('click', () => {
            this.router.navigate([na?.url])
          })
        }
      }
    })
    if(!cardBoxElement){
      console.log('cardbox not exist');
      return
    }
    const wrapperElement = this.wrapper()?.nativeElement;
    if(!wrapperElement){
      return
    }
    this.horizontalTween = gsap.to(cardBoxElement, {
      x: () => {
        const dist = Math.max(0, cardBoxElement.scrollWidth - window.innerWidth);
        this.distance = dist;
        return -dist;
      },
      ease: 'none',
      scrollTrigger: {
        trigger: wrapperElement,
        start: 'top top',
        end: () => '+=' + Math.max(0, cardBoxElement.scrollWidth - window.innerWidth),
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: 'tools-horizontal',
        // markers: true,
      }
    })
    window.addEventListener('resize', this._resizeHandler)
    ScrollTrigger.refresh()
    // console.log(this.cardbox()?.nativeElement.offsetWidth);
  }
  ngAfterContentInit(): void {}
  resize():void{
    const cardBoxElement = this.cardbox()?.nativeElement;
    const wrapperElement= this.wrapper()?.nativeElement;
    if(!wrapperElement){
      return
    }
    console.log(cardBoxElement?.scrollWidth);
    
    console.log(innerWidth);
    
    this.distance = cardBoxElement ? cardBoxElement.scrollWidth - innerWidth : 0;
  }
  
  ngOnDestroy(): void {
    window.removeEventListener('resize', this._resizeHandler)
    if (this.horizontalTween) { this.horizontalTween.kill() }
    const st = ScrollTrigger.getById('tools-horizontal')
    if (st) { st.kill() }
  }
}
