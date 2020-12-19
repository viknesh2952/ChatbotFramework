import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { config, Observable } from 'rxjs';
import { ConfigModel } from './models/config.model';
import * as global from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigApiService {
 login_Url=global.DOMAIN+':'+global.PORT+global.API_PREFIX+'trade_io_user_login';
  getConfigTabledata=global.DOMAIN+':'+global.PORT+global.API_PREFIX+'get_app_config_tbl?app_id=1001';
  getConfigdata=global.DOMAIN+':'+global.PORT+global.API_PREFIX+'get_app_config_tbl';
  addConfig=global.DOMAIN+':'+global.PORT+global.API_PREFIX+'add_app_config';
  updateConfig=global.DOMAIN+':'+global.PORT+global.API_PREFIX+'update_app_config';
  constructor(private http:HttpClient) { }

  getApiData(){
    return this.http.get(this.getConfigdata);
  }
  getSubconfigmenu(app_id:number){
    return this.http.get(`${this.getConfig}?app_id=${app_id}`);
  }
  login(user_id:string,user_password:string): Observable< any > {
    return this.http.post<any>(this.login_Url, {"user_id":`${user_id}`,"user_password":`${user_password}`}, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  getConfig(app_id: number): Observable<any> {
    return this.http.get<any>(`${this.getConfig}?app_id=${app_id}`);
  }
  addconfig(config: ConfigModel): Observable<ConfigModel> {
    return this.http.post<ConfigModel>(this.addConfig, config, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  updateconfig(config: ConfigModel): Observable<void> {
        return this.http.post<void>(`${this.updateConfig}`, config, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
}