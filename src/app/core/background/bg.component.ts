import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import {gsap} from 'gsap'
@Component({
  selector: 'bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.less'],
  // host:{
  //   '(mousemove)':'updateEye($event)'
  // }
})
export class bgComponent implements AfterViewInit, OnDestroy {
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  
  constructor() {
    
  }
  ngOnInit(){
    let eyeball=document.getElementsByClassName('eyeball') as any;
    this.mouseMoveListener = (e: MouseEvent) => {
      if (!eyeball || eyeball.length === 0) return;
      
      let x=e.clientX*100/window.innerWidth+"%";
      let y=e.clientY*100/window.innerHeight+"%";
      // console.log('wid:'+window.innerWidth+" hei:"+window.innerHeight);
      
      for(let i=0;i<2;i++){
        if (eyeball[i]) {
          eyeball[i].style.left=x
          eyeball[i].style.top=y
          eyeball[i].style.transform=`translate(-${x},-${y})`
        }
      }
    };
    window.addEventListener('mousemove', this.mouseMoveListener);
  }
  ngOnDestroy(): void {
    if (this.mouseMoveListener) {
      window.removeEventListener('mousemove', this.mouseMoveListener);
      this.mouseMoveListener = null;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const circleElement = document.querySelector('.background-circle');
      if (circleElement) {
        circleElement.classList.add('initial-transform');
      }
    }, 100);
    gsap.to('.blue-cloud',{
      y:50,
      duration:2,
      yoyo:true,
      repeat:-1,
      ease:'power1.inOut'
    })
    // gsap.to('#sun',{
    //   rotate:360,
    //   duration:60,
    //   repeat:-1
    // })
    
    
  }
  cloudClick=()=>{
    // console.log('cloud click');
    // const cheeks=document.querySelectorAll('.cheeks')
    // gsap.to('.cheeks',{
    //   duration:0.25,
    //   opacity:0.2,
    //   yoyo:true
    // })
    // gsap.fromTo('.cheeks',{
    //   opacity:0.6
    // },{
    //   opacity:0,
    //   duration:0.3
    // })
    // gsap.to('.eye',{
    //   scaleY:0.3
    // })
    let tl=gsap.timeline()
    tl.to('.cloud-eye',{
      scaleY:0.3,
      duration:0.1
    },0).to('.fleck',{
      opacity:0,
      duration:0.1
    },'<').to('.cheeks',{
      opacity:0.1,
      duration:0.05
    },'<').to('.cloud-eye',{
      scaleY:1,
      duration:0.1
    },'>0.15').to('.fleck',{
      opacity:1,
      duration:0.1
    },'<').to('.cheeks',{
      opacity:0,
      duration:0.05
    },'<')
  }
  
  // updateEye(event:MouseEvent){
    
  // }
}
