import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenunameService {

  private message = new BehaviorSubject('Story Master');
  sharedMessage = this.message.asObservable();
  public productdata;  
  menudata: any;
  constructor(private router:Router) { }
  
  setProductList(value) {      
     this.productdata=value;
   }  
   
   getProductList() {  
     return this.productdata;  
   }  
   setMenuList(value) {      
    this.menudata=value;
  }  
  routeAuth(route) {  
    var y=this.menudata.includes(route);
    if(y==false){
      this.router.navigate(['/NotFound']);
    }
  }  
  nextMessage(message: string) {
    this.message.next(message)
  }
  
}