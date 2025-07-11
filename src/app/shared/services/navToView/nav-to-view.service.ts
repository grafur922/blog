import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NavToViewService {

  constructor() { }
  private router=inject(Router)
  router$=1
  view(id:string){
    this.router.navigate(['/view/'+id])
  }
}
