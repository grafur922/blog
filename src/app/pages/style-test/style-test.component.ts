import { Component } from '@angular/core';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
gsap.registerPlugin(DrawSVGPlugin)
@Component({
  selector: 'app-style-test',
  imports: [],
  templateUrl: './style-test.component.html',
  styleUrl: './style-test.component.less'
})
export class StyleTestComponent {

  start():void{
    console.log('start');
    const path = document.querySelector('#line')
    gsap.set("#line", {visibility:"visible"});
    if(!path){
      return
    }
    // gsap.set()
    gsap.to(path,{
      duration:2,
      drawSVG:'0% 100%',
      ease:'none'
    })
  }
}
