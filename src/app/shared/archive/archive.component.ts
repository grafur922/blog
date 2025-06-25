import { Component } from "@angular/core";
import { cardTmpComponent } from "../cardTmp/cardTmp.component";
@Component({
    selector:'archive',
    templateUrl:'./archive.component.html',
    imports:[cardTmpComponent],
    styleUrl:'./archive.component.less'
})
export class ArchiveComponent{
    constructor(){}
    iconName:string='fa-inbox'
}