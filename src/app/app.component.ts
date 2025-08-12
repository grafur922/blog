import { Component,inject,OnInit } from '@angular/core';
import { RouterLink, RouterOutlet,RouterLinkActive } from '@angular/router';
import { LoadingService } from './shared/services/loading/loading.service';
import { tap } from 'rxjs';
import { LoadingScreenComponent } from "./core/loading-screen/loading-screen.component";
// import { NzIconModule } from 'ng-zorro-antd/icon';
// import { NzLayoutModule } from 'ng-zorro-antd/layout';
// import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingScreenComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  // loading=inject(LoadingService)
  // isCollapsed = false;
  // toggleCollapse(): void {
  //   this.isCollapsed = !this.isCollapsed;
  // }
  constructor() {
    // this.loading.loadCriticalAssets().subscribe(res=>{
    //   console.log(res);
      
    // })
  }
}

