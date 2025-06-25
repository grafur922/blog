import { Component, inject, OnInit } from '@angular/core';
// import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink,Router } from '@angular/router';
import axios from 'axios'
import { LoggerService } from '../services/Logger/logger.service';

@Component({
    selector: 'my-card',
    templateUrl: './myCard.component.html',
    imports: [],
    styleUrls: ['./myCard.component.less']
})
export class MyCardComponent implements OnInit {
    Logger=inject(LoggerService)
    router:Router
    constructor(router:Router){
        this.router=router
    }
    newBlog(){
        axios.post('/api/verify',{upwKey:localStorage.getItem('upwKey')??''}).then(res=>{
            this.Logger.log(res)
            
            if(res.data.code===1){
                this.router.navigate(['/newblog'])
            }
            else{
                this.Logger.error(res)
                
            }
        })
    }
    ngOnInit(): void {
        this.Logger.log('MyCardComponent initialized')
        
    }
    article:number=0
    classify:number=0
    tag:number=0

}





