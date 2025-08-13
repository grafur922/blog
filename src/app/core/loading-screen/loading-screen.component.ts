import { Component, ElementRef, OnInit, viewChild, viewChildren, AfterViewInit, inject } from '@angular/core';
import { gsap } from 'gsap'
import { LoadingService } from '../../shared/services/loading/loading.service';
@Component({
  selector: 'app-loading-screen',
  imports: [],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.less'
})
export class LoadingScreenComponent implements AfterViewInit, OnInit {
  dummyArray = Array(8)
  loading=inject(LoadingService)
  // boxEl=viewChild<ElementRef<HTMLDivElement>>("box");
  boxGroup = viewChildren<ElementRef<HTMLDivElement>>("box")
  container = viewChild<ElementRef<HTMLDivElement>>("boxContainer")
  loadingMain=viewChild<ElementRef<HTMLDivElement>>("loadingMain")
  curBox = 0
  // rotation = 0;
  // offsetL=0;
  // step = 0;
  constructor(){
    this.loading.loadCriticalAssets().subscribe(res=>{
      this.loadingComp()
    })
  }
  // readonly origins = ['right bottom', 'left bottom', 'left top', 'right top'];
  ngAfterViewInit(): void {
    let boxGroup = this.boxGroup()
    setTimeout(() => {
      this.rotate(0, boxGroup as Array<ElementRef<HTMLDivElement>>)
    }, 200);
  }
  rotateNext() {
    // let boxGroup = this.boxGroup()
    // for (let i = 0; i < boxGroup.length; i++) {

    // }
  }
  loadingComp() {
    let container = this.container()?.nativeElement
    let loadingMain=this.loadingMain()?.nativeElement
    if(container){
      container.style.display="none"
    }
    if (loadingMain) {
      
      loadingMain.classList.add('is-animated')
      // loadingMain.style.width="0px !important"
      // loadingMain.style.display="none"
    }
  }
  rotate(x: number, boxGroup: Array<ElementRef<HTMLDivElement>>) {
    if (x >= boxGroup.length) {
      // this.rotate(0, boxGroup)
      this.curBox = 0
      return;
    }
    this.boxGroup()[x].nativeElement.style.setProperty('--rotation', '90deg')
    this.boxGroup()[x].nativeElement.addEventListener('transitionend', () => {
      this.boxGroup()[x].nativeElement.style.visibility = "hidden"
      if (x + 1 < boxGroup.length) {
        boxGroup[x + 1].nativeElement.style.visibility = "visible"
      }
      else {
        boxGroup[x].nativeElement.style.visibility = "visible"
      }
      boxGroup[x].nativeElement.removeEventListener('transitionend', () => {
        console.log("removeListener");
      })
      this.rotate(x + 1, boxGroup)
    })
  }
  ngOnInit(): void {


    // const boxEl = this.box()?.nativeElement;
    // if (boxEl) {
    //   boxEl.addEventListener('transitionend', () => this.rotateNext());
    //   this.rotateNext();
    // }
  }


  // rotateNext() {
  //   setTimeout(() => {
  //     const boxEl = this.box()?.nativeElement;
  //     if (!boxEl) return;

  //     const currentOrigin = this.origins[this.step % 4];
  //     boxEl.style.transformOrigin = currentOrigin;
  //     boxEl.style.setProperty('--offsetL',`${this.offsetL}px`)

  //     this.offsetL+=80
  //     this.rotation += 90;
  //     boxEl.style.setProperty('--rotation', `${this.rotation}deg`);
  //     this.step++;

  //     console.log(`Step: ${this.step}, Origin: ${currentOrigin}, Rotation: ${this.rotation}deg`);
  //   }, 0);
  // }
}