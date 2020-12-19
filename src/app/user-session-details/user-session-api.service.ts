import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/Product.model';
import { UserSessionDetails, UserSessionDetails1 } from '../models/user-session.model';
import {AppConfigService} from 'src/app/app-config.service';

@Injectable({
providedIn: 'root'
})
export class UserSessionApiService {
  protected dynamic=AppConfigService.settings;
  global;
  
  getUserSessionDetails;
deleteUserSessionDetailsApi;
addUserSessionDetailsApi;
updateUserSessionDetailsApi;
constructor(private http:HttpClient) { 
  this.global=this.dynamic.global;
  this.getUserSessionDetails=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_user_session_details';
  this.deleteUserSessionDetailsApi=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'delete_user_session_details';
  this.addUserSessionDetailsApi=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'add_user_session_details';
  this.updateUserSessionDetailsApi=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'update_user_session_details';
}
getApiData(){
  console.log(this.getUserSessionDetails)
return this.http.get(this.getUserSessionDetails);
}
deleteUserSessionDetails(usd_key: number,usd_session_id: string,usd_user_key: string,usd_user_profile_role_key: string): Observable<any> {
  console.log(this.deleteUserSessionDetailsApi,{usd_key:`${usd_key}`,usd_session_id:`${usd_session_id}`,usd_user_key:`${usd_user_key}`,usd_user_profile_role_key:`${usd_user_profile_role_key}`});
  return this.http.post<any>(this.deleteUserSessionDetailsApi,{usd_key:`${usd_key}`,usd_session_id:`${usd_session_id}`,usd_user_key:`${usd_user_key}`,usd_user_profile_role_key:`${usd_user_profile_role_key}`},{
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
});
}
addUserSessionDetails(usersessiondetails: UserSessionDetails): Observable<UserSessionDetails> {
  return this.http.post<UserSessionDetails>(this.addUserSessionDetailsApi, usersessiondetails, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  });
}
updateUserSessionDetails(usersessiondetails: UserSessionDetails1): Observable<void> {
  console.log(usersessiondetails);
  return this.http.post<void>(`${this.updateUserSessionDetailsApi}`,usersessiondetails, {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
});
}
getApiDatakey(usd_key: number){
  console.log(this.getUserSessionDetails)
return this.http.get('http://192.168.53.125:5015/api/v1/get_user_session_details?usd_key='+usd_key);
}
}
 
