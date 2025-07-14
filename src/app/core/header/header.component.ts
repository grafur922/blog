import { afterNextRender, Component, Inject, inject, OnInit } from '@angular/core';
import { Logger } from '../../shared/interfaces/Logger';
import { LoggerService } from '../../shared/services/Logger/logger.service';
import { NAV_TOKEN } from '../../token';
import { navConfig } from '../../shared/interfaces/navConfig';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap'
type pConfig = Pick<navConfig, 'url' | 'enable'>
import { Router } from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
    imports:[NgbCollapseModule]
})
export class HeaderComponent implements OnInit {
    public isMenuCollapsed = true;
    navToken = inject<navConfig[]>(NAV_TOKEN)
    Logger = inject(LoggerService)
    map = new Map<string, pConfig>()
    constructor(private router:Router) { 
        afterNextRender({
            write() {
                
            },
        })
    }
    test(){
        this.router.navigate(['/'])
    }
    
    //为以后添加的li标签(设置了name属性的)添加路由跳转，在app.config.ts配置
    ngOnInit(): void {
        this.navToken.forEach(e => {
            this.map.set(e.name, { url: e.url, enable: e.enable === false ? false : true })
        })
        const nav = document.querySelectorAll('.list-ul-li')
        nav.forEach(e => {
            let name = e.getAttribute('name') ?? ''
            if (this.map.has(name)) {
                let na=this.map.get(name)
                // this.Logger.log(na)
                
                if (na?.enable !== false) {
                    e.addEventListener('click', () => {
                        this.router.navigate([na?.url])
                    })
                }
            }
        })

    }

}