import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel ,  UserModel1} from './models/user.model';
import {AppConfigService} from 'src/app/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  protected dynamic=AppConfigService.settings;
  global;

  getUserdata;
  addUserdata;
  getReferenceDetail;
  updateUserdata;
  getProductdata;
  deleteUserdata;

  constructor(private http:HttpClient) {
  this.global=this.dynamic.global;
  this.getUserdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'User_master_get_list';
  this.addUserdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'add_user_in_user_master';
  this.updateUserdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'update_user_in_user_master';
  this.deleteUserdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'delete_user_from_user_master'
  this.getProductdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_product';
  this.getReferenceDetail=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_ref_codes_list';
  }
  getProduct(){
    return this.http.get(this.getProductdata);
  }
  getApiData(){
    return this.http.get(this.getUserdata);
  }
  getRefDetail(){
    //return this.http.get(`${this.getReferenceDetail}?RCD_HEADER_KEY=${RCD_HEADER_KEY}`);
    return this.http.get(`${this.getReferenceDetail}?RCH_DOMAIN_NAME=T_TVS_CHATBOT_STORY.ACTIVE_FLAG`);
  }
  getUser(user_key: number): Observable<UserModel> {
    return this.http.get<any>(`${this.getUserdata}?user_key=${user_key}`);
  }
  adduser(user: UserModel): Observable<UserModel> {
    console.log(this.addUserdata + user);
    return this.http.post<UserModel>(this.addUserdata, user, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  updateuser(user: UserModel1): Observable<void> {
        return this.http.post<void>(`${this.updateUserdata}`, user, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  deleteuser(user_key): Observable<any> {
    return this.http.post<any>(this.deleteUserdata,{user_key:user_key},{
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }

}
