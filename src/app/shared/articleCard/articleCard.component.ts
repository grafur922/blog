import { Component, input, OnInit, signal } from "@angular/core";
import { MatIconModule } from '@angular/material/icon'
import { imgData } from "../interfaces/imgData";
import { ArticleFormData } from "../interfaces/articleFormData";

@Component({
    selector: 'article-card',
    templateUrl: './articleCard.component.html',
    imports: [MatIconModule],
    styleUrl: './articleCard.component.less'
})
export class articleCardComponent implements OnInit{
    constructor() { }
    ngOnInit(): void {
        const current=this.index()
        if(current&&current%2===1){
            this.isrtl=true
        }
    }
    // imgUrl=input<string>()
    index=input<number>()
    isrtl:Boolean=false
    formData = input<ArticleFormData>()
    date = new Date();
    inputLoad: null | HTMLInputElement = null
    imgdetail: null | HTMLImageElement = null
    imgData=input<imgData>()
    reader = new FileReader();
    
    preview=input<boolean>(false)
    print() {
        console.log(this.formData());

    }
    loadImg() {
        this.inputLoad = document.querySelector('.inputLoad')
        this.imgdetail = document.querySelector('.imgdetail')
        if (this.inputLoad) {
            this.inputLoad.click();
            this.inputLoad.onchange = () => {
                if (this.inputLoad && this.inputLoad.files && this.inputLoad.files[0].type.match('image.*')) {
                    const file = this.inputLoad.files[0];
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            const targetWidth = 500;
                            const targetHeight = 260;
                            canvas.width = targetWidth;
                            canvas.height = targetHeight;
                            ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);
                            // 导出压缩后的图片（jpeg格式，质量0.8，可根据需要调整）
                            canvas.toBlob((blob) => {
                                if (blob) {
                                    const compressedFile = new File([blob], file.name, { type: blob.type });
                                    const currentFormData = this.imgData();
                                    if (currentFormData) {
                                        currentFormData.img = compressedFile;
                                    }
                                    if (this.imgdetail) {
                                        this.imgdetail.src = URL.createObjectURL(blob);
                                    }
                                }
                            }, 'image/jpeg', 1);
                        };
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            }
        }

    }
}