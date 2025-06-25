import { Component,OnInit } from '@angular/core';
import { RouterLink, RouterOutlet,RouterLinkActive } from '@angular/router';
// import { NzIconModule } from 'ng-zorro-antd/icon';
// import { NzLayoutModule } from 'ng-zorro-antd/layout';
// import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  // isCollapsed = false;
  // toggleCollapse(): void {
  //   this.isCollapsed = !this.isCollapsed;
  // }
  constructor() {}
}

