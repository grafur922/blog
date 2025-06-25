import { Component, ElementRef, inject, OnInit, signal, viewChild, ChangeDetectorRef } from '@angular/core';
import gsap from 'gsap'
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-reflexes-test',
  imports: [MatButtonModule],
  templateUrl: './reflexes-test.component.html',
  styleUrl: './reflexes-test.component.less'
})
export class ReflexesTestComponent implements OnInit {
  ngOnInit(): void {

  }
  tl = gsap.timeline()
  tip_text='等待变红'
  circleRef = viewChild<ElementRef>('Circle')
  textRef = viewChild<ElementRef>('Text')
  state: string = 'OFF'
  INIT_TIME: number = 2000
  t1=0
  t2=0
  sum = 0
  dtext=''
  uclick: ReturnType<typeof setInterval> | null = null
  private cdr = inject(ChangeDetectorRef);
  init() {
    this.play()
    this.animateLoading()
  }
  hide(){
    const e=document.querySelector('.text') as HTMLElement
    e.style.display='none'
    e.style.color='#fff'
  }
  start() {
    if (this.state === 'OFF') {
      this.init()
      this.reflexes()
    }
    if(this.state==='ON'){
      this.hide()
      this.t2=performance.now()
      this.dtext=((this.t2-this.t1)>>0)+'ms'
    }
  }
  changeColor() {
    const element = this.circleRef()?.nativeElement;
    if (element) {
      element.style.backgroundColor = '#D98394'
    }
    this.tl.kill()
    this.tip_text='现在!'
    this.cdr.detectChanges();
    this.state = 'ON'
  }
  reflexes() {
    let r = Math.random() * 3000 >> 0
    setTimeout(() => {
      this.changeColor()
      this.t1=performance.now()
    }, this.INIT_TIME + r);
  }
  play() {
    gsap.to('.circle', {
      width: 400,
      height: 400,
      borderRadius: 200,
    })
    gsap.to('.text', {
      opacity: 0
    })
  }
  animateLoading() {
    const loadingText = document.querySelector('.tip');
    if (!loadingText) return;
    let dots = '';

    this.tl.to({}, {
      repeat: -1,
      duration: 0.6,
      onRepeat: () => {
        dots = dots.length < 3 ? dots + '.' : '';
        this.tip_text = '等待变红' + dots;
        this.cdr.detectChanges();
      }
    });
  }
}
