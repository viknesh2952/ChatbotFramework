import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleModel,RoleModel1 } from './models/role.model';
import {AppConfigService} from 'src/app/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class RolemasterApiService {
  protected dynamic=AppConfigService.settings;
  global;
  getroledata;
  addroledata;
  updateroledata;
  deleteroledata;
  getReferenceDetail;
  getProductdata;
  constructor(private http:HttpClient) {
    this.global=this.dynamic.global;
    this.getroledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'Role_master_get_list';
    this.addroledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'add_user_in_role_master';
    this.updateroledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'update_user_in_role_master';
    this.deleteroledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'delete_user_from_role_master';
    this.getReferenceDetail=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_ref_codes_list';
    this.getProductdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_product';

   }

  getProduct(){
    return this.http.get(this.getProductdata);
  }

  getApiData(){
    return this.http.get(this.getroledata);
  }

  getRefDetail(){
    return this.http.get(`${this.getReferenceDetail}?RCH_DOMAIN_NAME=T_TVS_CHATBOT_STORY.ACTIVE_FLAG`);
  }

  getRole(role_key: number): Observable<RoleModel> {
    return this.http.get<any>(`${this.getroledata}?role_key=${role_key}`);
  }
  addrole(role: RoleModel): Observable<RoleModel> {
    return this.http.post<RoleModel>(this.addroledata, role, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  updaterole(role: RoleModel1): Observable<void> {
        return this.http.post<void>(`${this.updateroledata}`, role, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  deleterole(role_key:string ): Observable<any> {
    console.log(this.deleteroledata,{role_key:`${role_key}`});
    return this.http.post<any>(this.deleteroledata,{role_key:`${role_key}`},{
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }

}
