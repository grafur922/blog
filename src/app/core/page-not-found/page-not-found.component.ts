import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/dist/ScrambleTextPlugin';


gsap.registerPlugin(ScrambleTextPlugin);

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.less'
})
export class PageNotFoundComponent implements OnInit {
  s='ΓΔΘΞΠΣΥΦΨΩαβγδεζηθικλμνξπρστυφψωЁБГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯæÆœŒёбгдежзийклмнопрстуфхцчшщъыьэюя'
  tl = gsap.timeline({
    id: 'page-not-found',
    defaults: { ease: "none" }
  });

  ngOnInit() {
    
    setTimeout(() => {
      this.play();
    },600);
  }
  play(){
    if(this.tl.isActive()){
      return
    }
    this.tl.to('#text1', {
      scrambleText: {
        text: 'ΓΔΘΞΠΣΥΦΨΩαβγδεζηθικλμνξπρστυφψωЁБГДЕЖЗИ',
        chars: this.s,
        // speed: 0.5,
      },duration:1.5
    }).to('#text2', {
      scrambleText: {
        text: 'ЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯæÆœŒ',
        chars: this.s,
        // speed: 0.5,
      },duration:1.5
    }).to('#text3', {
      scrambleText: {
        text: 'ёбгдежзийклмнопрстуфхцчшщъыьэюя',
        chars: this.s,
        // speed: 0.5,
      },duration:1.5
    })
    
    // this.tl.play();
  }
}
