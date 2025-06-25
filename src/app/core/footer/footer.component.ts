import { Component, Inject, OnInit } from '@angular/core';
import { LoggerService } from '../../shared/services/Logger/logger.service';
import { Logger } from '../../shared/interfaces/Logger';
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less','./font_4903440_5diih98g2bf/iconfont.css']
})
export class FooterComponent implements OnInit{
  constructor(@Inject(LoggerService) private Logger:Logger){

  }
  ngOnInit(): void {
    this.Logger.log('footer works!')
  }
}
