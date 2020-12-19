import { Injectable } from '@angular/core';
//import * as global from 'src/config';
import { SubModuleModel } from 'src/app/models/Sub-module.model'
import {HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConfigService} from 'src/app/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SubModuleapiService {
  protected dynamic=AppConfigService.settings;
  global;

  getModuledata;
  addModuledata;
  updateModuledata;
  deleteModuledata;
  getProductdata;
  getReferenceDetail;


  constructor(private http:HttpClient) {
  this.global=this.dynamic.global;
  this.getModuledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_submodule_by_module';
  this.addModuledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'add_sub_module';
  this.updateModuledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'update_sub_module';
  this.deleteModuledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'delete_sub_module'
  this.getProductdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_product';
  this.getReferenceDetail=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_ref_codes_list';


   }
  getProduct(){
    return this.http.get(this.getProductdata)
  }
  getApiData(){
    return this.http.get(this.getModuledata);
  }
  getRefDetail(){
    return this.http.get(`${this.getReferenceDetail}?RCH_DOMAIN_NAME=T_TVS_CHATBOT_STORY.ACTIVE_FLAG`);
  }


    getSubmodule(SUB_MODULE_KEY: number): Observable<SubModuleModel>{
      return this.http.get<any>(`${this.getModuledata}?SUB_MODULE_KEY=${SUB_MODULE_KEY}`);
    }
    addSubmodule(submodule: SubModuleModel): Observable<SubModuleModel>{
      console.log(this.addModuledata + submodule);
      return this.http.post<SubModuleModel>(this.addModuledata, submodule, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    updateSubmodule(submodule: SubModuleModel):Observable<void>{
      return this.http.post<void>(`${this.updateModuledata}`, submodule, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    deleteSubmodule(SUB_MODULE_KEY:string, SUB_MODULE_CODE:string): Observable<any>{
      console.log(this.deleteModuledata,{ SUB_MODULE_KEY:`${SUB_MODULE_KEY}`, SUB_MODULE_CODE:`${SUB_MODULE_CODE}`});
      return this.http.post<any>(this.deleteModuledata,{SUB_MODULE_KEY:`${SUB_MODULE_KEY}`, SUB_MODULE_CODE:`${SUB_MODULE_CODE}`},{
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
    }

}
