import { Component } from "@angular/core";
import { cardTmpComponent } from "../cardTmp/cardTmp.component";

@Component({
    selector: "statistics",
    templateUrl: "./statistics.component.html",
    styleUrls: ["./statistics.component.less"],
    imports: [cardTmpComponent],
    })
export class StatisticsComponent {
    constructor() {}
    iconName='fa-chart-simple'
}
