import { Component, inject, OnInit } from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop'
import {UTdata} from '../../shared/interfaces/Utdata'
import axios from 'axios'
import { LoggerService } from '../../shared/services/Logger/logger.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-typing',
  imports: [CdkDrag,DatePipe], 
  templateUrl: './typing.component.html',
  styleUrl: './typing.component.less'
})
export class TypingComponent implements OnInit{
  Logger=inject(LoggerService)
  words=''
  count=0
  data:UTdata={
    time:0,
    accuracy:0,
    speed:0
  }
  ngOnInit(): void {
    
    axios.post("/api/getSentence",{
      upper:false,
      words:25
    }).then(res=>{
      this.Logger.log(res.data.data);
      this.words=(res.data.data as []).join(' ')
      this.Logger.log(this.words)
      
    }).catch(res=>{
      this.Logger.error(res)
    })
    
  }
  focus(){
      const mask = document.querySelector('.mask') as HTMLElement | null
      if(mask){
        // mask.style.height='auto'
      }
    }
  handleInput(event: KeyboardEvent){
    if (event.key === ' ') {
      const selection = window.getSelection();
      // 检查是否存在选区
      if (!selection || selection.rangeCount === 0) {
        return;
      }

      const range = selection.getRangeAt(0);

      // 如果用户选择了某段文字，则不执行任何操作
      if (!range.collapsed) {
        return;
      }

      // 获取当前光标的矩形区域信息
      const originalRange = range.cloneRange();
      const cursorRect = originalRange.getBoundingClientRect();

      // 关键步骤：使用 selection.modify 临时将光标向前移动一个字符
      // 这会改变当前的 selection，所以我们之前保存了原始位置
      selection.modify('move', 'forward', 'character');
      
      // 获取移动后光标的矩形区域信息
      const nextCharRect = selection.getRangeAt(0).getBoundingClientRect();

      // 立即恢复光标到原始位置，用户不会察觉到任何变化
      selection.removeAllRanges();
      selection.addRange(originalRange);

      // 比较两个矩形区域的 top 值。如果下一个字符的 top 值大于当前光标的 bottom，
      // 说明下一个字符在新的一行，因此当前光标在行末。
      if (nextCharRect.top > cursorRect.bottom) {
        this.Logger.log('检测到光标在行末，执行换行。');

        // 阻止默认的空格输入行为
        event.preventDefault();

        // 创建一个 <br> 标签并插入到光标位置
        const br = document.createElement('br');
        originalRange.insertNode(br);

        // 创建一个新的 Range，并将光标移动到 <br> 标签之后
        const newRange = document.createRange();
        newRange.setStartAfter(br);
        newRange.collapse(true);

        // 更新选区，使光标显示在正确的位置
        selection.removeAllRanges();
        selection.addRange(newRange);

        // 因为我们阻止了默认事件，所以在此处返回
        return;
      }
    }
  //   const mask = document.querySelector('.mask') as HTMLElement;
  // const position = this.getCursorPosition(mask);
  }
  
}
