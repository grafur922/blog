import { Component, inject, OnInit } from '@angular/core';
import { ToolsCardTemplateComponent } from "../../shared/tools-card-template/tools-card-template.component";
import { TOOLS_TOKEN } from '../../token';
import { navConfig } from '../../shared/interfaces/navConfig';
import { Logger } from '../../shared/interfaces/Logger';
import { LoggerService } from '../../shared/services/Logger/logger.service';
import { Router } from '@angular/router';
import { DecideComponent } from "../decide/decide.component";
type pConfig=Pick<navConfig,'url' | 'enable'>
@Component({
  selector: 'app-tools',
  imports: [ToolsCardTemplateComponent, DecideComponent],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.less'
})
export class ToolsComponent implements OnInit{
  urlToken=inject<navConfig[]>(TOOLS_TOKEN)
  map = new Map<string, pConfig>()
  Logger=inject(LoggerService)
  router=inject(Router)
  ngOnInit(): void {
    this.urlToken.forEach(e => {
            this.map.set(e.name, { url: e.url, enable: e.enable === false ? false : true })
        })
        const nav = document.querySelectorAll('app-tools-card-template')
        nav.forEach(e => {
            let name = e.getAttribute('name') ?? ''
            if (this.map.has(name)) {
                let na=this.map.get(name)
                this.Logger.log(na)
                
                if (na?.enable !== false) {
                    e.addEventListener('click', () => {
                        this.router.navigate([na?.url])
                    })
                }
            }
        })
  }
}
