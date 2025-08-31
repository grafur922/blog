import { Component, OnInit, ViewChild, AfterViewInit, signal, model, OnDestroy, DestroyRef, Inject, viewChild, ElementRef, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { articleCardComponent } from "../../shared/articleCard/articleCard.component";
import { FormControl, FormsModule ,Validators} from '@angular/forms';
import { imgData } from '../../shared/interfaces/imgData';
import {MatInputModule,MatLabel} from '@angular/material/input'
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import axios from 'axios'
import { Router } from '@angular/router';
import { ArticleFormData } from '../../shared/interfaces/articleFormData';
import { LoggerService } from '../../shared/services/Logger/logger.service';
@Component({
  selector: 'app-new-blog',
  imports: [MatFormFieldModule, FormsModule, MatSelectModule, MatButtonModule, articleCardComponent,MatInputModule,MatLabel],
  templateUrl: './new-blog.component.html',
  styleUrl: './new-blog.component.less'
  
})
export class NewBlogComponent implements OnInit {
  constructor(public dialog: MatDialog,public router:Router) {}
  
  formControl=new FormControl('',[Validators.required])
  complete:Boolean=true
  @ViewChild('contentInput') contentInput: any;
  wordCount: number = 0;
  visble: String = 'public';
  tmpFileMd:File|null=null
  imgData: imgData = {
    img: null
  }
  Logger=inject(LoggerService)
  upFileRef=viewChild<ElementRef>("upFile")
  checkFile(fileName:string,match:string[]){
    
  }

  upLoadMd(){
    let fileInput =this.upFileRef()?.nativeElement as HTMLInputElement
    // upmd.dispatchEvent(new Event('click'))
    fileInput.click()
    fileInput.onchange=()=>{
      if(fileInput.files&&fileInput.files[0].name.length<30&&fileInput.files[0].name.match(/.md$/)){
        this.tmpFileMd=fileInput.files[0]
      }
    }
  }
  formData:ArticleFormData = {
    title: '默认标题',
    categoryId: 1,
    visibility: 'public',
    content: '',
    img: '',
    categoryName:'',
    markdown:''
  }
  
  judgeDefaultTitle() {
    if (this.formData.title == '默认标题') {
      this.formData.title = '';
    }
  }
  autoResize(event:any) {
    // console.log(this.titleValue());
    // const input=document.querySelector('.titleInput')
    //@ts-ignore
    // input!.input=(e)=>{
    //   e.preventDefault()
    // }
    // console.log(event);
    const textarea = event.target;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    window.scrollTo(0, scrollTop);
  }
  ngOnInit(): void {
    console.log('new blog works!');
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.autoResize({ target: this.contentInput.nativeElement });
    });
  }
  cursorPosition: number = 0;
  currentLineLength: number = 0;
  remainingSpace: number = 0;
  maxLineLength: number = 200;
  linepercent: number = 0;
  updateCursorPosition(event: any) {
    const textarea = event.target;
    this.cursorPosition = textarea.selectionStart;

    const mirror = document.createElement('div');
    mirror.style.width = getComputedStyle(textarea).width;
    mirror.style.font = getComputedStyle(textarea).font;
    mirror.style.padding = getComputedStyle(textarea).padding;
    mirror.style.position = 'absolute';
    mirror.style.visibility = 'hidden';
    mirror.style.whiteSpace = 'pre-wrap';
    // mirror.style.wordWrap = 'break-word';
    document.body.appendChild(mirror);
    this.linepercent = this.cursorPosition / this.maxLineLength * 100;
    document.body.removeChild(mirror);
    this.updateStatusBar();
  }

  updateStatusBar() {
    // const progressPercentage = (this.currentLineLength / this.maxLineLength) * 100;
    //@ts-ignore
    document.querySelector('.progress').style.width = `${this.linepercent}%`;
  }
  submit() {
    
    
    if(this.tmpFileMd){
      this.uploadFile(this.tmpFileMd,'markdown').then(res=>{
        console.log(res);
        this.formData.markdown=res.data
      }).catch(res=>{
        console.log(res);
        return
        
      })
    }
    if(this.imgData){
      this.uploadFile(this.imgData.img!,'image').then((res)=>{
        if(res.code===1){
          this.formData.img=res.data
          // this.formData.img=res
          console.log(this.formData);
          
          axios.post('/api/addBlog',this.formData).then(res=>{
            console.log(res);
            this.turnToHome()
          }).catch(res=>{
            console.log(res);
          })
        }else{
          console.log('上传失败');
        }
      })
    }
    else{
      console.log('没有图片');
    }

  }
  // upFile(){
  //   console.log(this.upFileRef);
  // }
  async uploadFile(file: File,type:string) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type',type)
    const res = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    }).then((res) => {
      return res.data
    }
    ).catch((err) => {
      this.Logger.error(err)
      this.complete=false
      return null
    })
    return res
  }
  time: number = 3;
  turnToHome(enterAnimationDuration: string='0ms', exitAnimationDuration: string = '0ms') {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '200px',
      width: '300px',
      data: {
        time: this.time
      },
    })
    
  }
  closeDialog(){
    
  }
}
@Component({
  selector: 'MatDialog',
  template: `
    <h2 mat-dialog-title>发布成功</h2>
    <mat-dialog-content>
      将在{{data.time}}秒后跳转到首页
    </mat-dialog-content>
    <mat-dialog-actions>
    <button mat-button mat-dialog-close (click)="cancel()">取消</button>
    <button mat-button mat-dialog-close cdkFocusInitial (click)="confirm()">确认</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent]
})
export class DialogComponent implements OnInit  {
  
  constructor(public router:Router,@Inject(MAT_DIALOG_DATA) public data: {time: number},private dialogRef: MatDialogRef<DialogComponent>) { }
  // time: number = 3;
  ngOnInit(): void {
    
  }
  interval=setInterval(() => {
    this.data.time--
    if (this.data.time == 0) {
      this.dialogRef.close()
      this.confirm()
    } 
  },1000)
  cancel(){
    clearInterval(this.interval)
  }
  confirm(){
    clearInterval(this.interval)
    this.router.navigate(['/'])
  }
  
}
