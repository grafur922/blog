import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Stats } from '../../shared/interfaces/Stats';
import {CdkDrag} from '@angular/cdk/drag-drop'
type CharState = 'pending' | 'correct' | 'incorrect';

interface CharObject {
  char: string;
  state: CharState;
}

interface InputState {
  curPos: number
  row: number
  col: number
  correct: number
  incorrect: number
  [prop:string]: unknown
}

type Line = CharObject[];

@Component({
  selector: 'app-root',
  imports: [CdkDrag],
  templateUrl: './typing.component.html',
  styleUrl: './typing.component.less'
})
export class TypingComponent implements OnInit {
  title = 'Typing';
  cap_state = false
  initChars = 80
  originalText = "A textarea does not expose its line layout to JavaScript, which makes it very difficult to determine where the visual line breaks are. To solve this, we can render each character as an individual element, giving us full control over the layout and styling. This method allows us to precisely track the user's input and manage the state of each character, including simulating a cursor and handling line breaks exactly as we want. Press space at the end of a line to see the effect.";
  words = this.originalText.split(' ')
  line: Line[] = []
  
  inputState: InputState = {
    curPos: 0,
    row: 0,
    col: 0,
    correct: 0,
    incorrect: 0,
    lastError:-1
  }
  spanRef: HTMLCollectionOf<Element> | null = null
  stats: Stats = {
    cpm: 0,
    accuracy: 0,
    typedChars: 0,
    errors: 0,
    startTime: null,
    
  }
  constructor() {

  }

  ngOnInit(): void {
    let tLine = ''
    let tCharObject: CharObject[] = []
    this.spanRef = document.getElementsByClassName('each-char')
    
    for (let i of this.words) {
      if ((i + tLine).length > this.initChars) {
        tLine.split('').forEach(e => {
          tCharObject.push({
            char: e,
            state: 'pending'
          })
        })
        this.line.push(tCharObject)
        tLine = ''
        tCharObject = []
      }
      tLine += i + ' '
    }
    console.log(this.line);
    console.log(document.getElementsByClassName('each-char').item(0));
    setTimeout(() => {
      document.getElementsByClassName('each-char').item(0)?.classList.add('curChar')
    }, 100);
    
  }
  handleKeyDown(event: KeyboardEvent) {
    let is=this.inputState
    if (this.isModifierKey(event.key)) {
      return;
    }
    event.preventDefault()
    let { key } = event
    // key=key==='space'?' ':key
    // this.spanRef?.item(is.curPos)?.classList.add('curChar')
    // console.log(this.line[is.row][is.col].char);
    console.log(this.line[is.row][is.col].char);
    // console.log(is.curPos);
    
    if (key === this.line[is.row][is.col].char) {
      this.spanRef?.item(is.curPos)?.classList.remove('curChar')
      is.col++
      is.curPos++
      if(is.col===this.line[is.row].length&&is.row===this.line.length){
        return;
      }
      if(is.col>=this.line[is.row].length){
        is.col=0
        is.row++
      }
      this.spanRef?.item(is.curPos)?.classList.add('curChar')
    }
    else{
      if(is['lastError']!==is.curPos){
        is.incorrect+=1
      }
      is['lastError']=is.curPos
      console.log(`curpos is ${is.curPos}`);
      this.line[is.row][is.col].state='incorrect'
    }
    // console.log(key);
    
  }

  isModifierKey = (key: string) => {
    const modifierKeys = [
      'Shift', 'Control', 'Alt', 'AltGraph', 'Meta',
      'CapsLock', 'Tab', 'Escape', 'Fn', 'FnLock',
      'Hyper', 'NumLock', 'ScrollLock', 'Super', 'Symbol',
      'SymbolLock', 'ContextMenu', 'ArrowLeft', 'ArrowRight',
      'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Backspace'
    ];
    return modifierKeys.includes(key);
  };
}
