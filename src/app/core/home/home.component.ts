import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LayoutComponent } from '../layout/layout.component';
import { bgComponent } from '../background/bg.component';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-home',
  imports: [HeaderComponent, LayoutComponent, bgComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  constructor(private http: HttpClient) {
    
  }
}
