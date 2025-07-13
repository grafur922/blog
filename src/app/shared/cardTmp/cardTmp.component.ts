import { Component,Input, OnInit } from "@angular/core";
// import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
    selector:'cardTmp',
    templateUrl:'./cardTmp.component.html',
    imports:[],
    styleUrl:'./cardTmp.component.less'
})
export class cardTmpComponent implements OnInit{
    constructor(){}
    rotate:boolean=false
    @Input() iconName:string=''
    print(){
        // console.log(this.nzTypeName);
    }
    ngOnInit(): void {
        
    }
}
// cardTmpComponent.prototype.print()