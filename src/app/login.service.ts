import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConfigService} from 'src/app/app-config.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  protected dynamic=AppConfigService.settings;
  global;
  getrefheader;
  login;
  logout;
  getproduct;
  constructor(private http: HttpClient) { 
    this.global=this.dynamic.global;
    this.getrefheader=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_reference_codes_header';
    this.getproduct = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX +'get_product';
    this.login = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX +'user_login';
    this.logout = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'update_user_session_logouttime';
  }
  getRefMenu(){
    return this.http.get(this.getrefheader);
  }
  getStoryMenu(){
    return this.http.get(this.getproduct);
  }

  Login(user_id:string,user_password:string): Observable< any > {
    return this.http.post<any>(this.login, {"user_id":`${user_id}`,"user_password":`${user_password}`}, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  Logout(id:any): Observable<any> {
    return this.http.post<any>(this.logout, { usd_key: `${id}`}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
