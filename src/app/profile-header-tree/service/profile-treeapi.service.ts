import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfiletreeModel } from 'src/app/models/profile-tree.model'
import * as global from 'src/config';

@Injectable({
  providedIn: 'root'
})

export class ProfileTreeapiService {
  login_Url=global.DOMAIN+':'+global.PORT+global.API_PREFIX+'user_login';
  getprofiletree=global.DOMAIN+':'+global.PORT+global.API_PREFIX+'get_profile_hierarchy_detail_tree_order';
  addtree=global.DOMAIN+':'+global.PORT+global.API_PREFIX+'';
  updatetree=global.DOMAIN+':'+global.PORT+global.API_PREFIX+'';
  deletetree=global.DOMAIN+':'+global.PORT+global.API_PREFIX+''
  getProductdata=global.DOMAIN+':'+global.PORT+global.API_PREFIX+'get_product';
  getReferenceDetail=global.DOMAIN+':'+global.PORT+global.API_PREFIX+'get_ref_codes_list';



  constructor(private http:HttpClient) { }
  getProduct(){
    return this.http.get(this.getProductdata);
  }
  getApiData(){
    return this.http.get(this.getprofiletree);
  }
  login(userid:string,user_password:string): Observable< any > {
    return this.http.post<any>(this.login_Url, {"userid":`${userid}`,"user_password":`${user_password}`}, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
      });
    }
    gettree(pmd_header_key: number): Observable<ProfiletreeModel> {
      return this.http.get<any>(`${this.getprofiletree}?pmd_header_key=${pmd_header_key}`);
    }
    public query(reportsTo: number = null): Observable<ProfiletreeModel[]> {
      return this.http.jsonp<ProfiletreeModel[]>(
          `${this.getprofiletree}?id=${reportsTo}`,
          'callback'
      );
  }
}
