import { Injectable } from '@angular/core';
import {AppConfigService} from 'src/app/app-config.service';
import { ModuleModel } from 'src/app/models/module.model'
import {HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulemasterapiService {
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
  this.getModuledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_module';
  this.addModuledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'add_module';
  this.updateModuledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'update_module';
  this.deleteModuledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'delete_module'
  this.getProductdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_product';
  this.getReferenceDetail=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_ref_codes_list';

   }
  getProduct(){
    return this.http.get(this.getProductdata)
  }
  getApiData(){
    return this.http.get(this.getModuledata);
  }
  getProductvalue(){
    return this.http.get(this.getProductdata);
  }
  getRefDetail(){
    return this.http.get(`${this.getReferenceDetail}?RCH_DOMAIN_NAME=T_TVS_CHATBOT_STORY.ACTIVE_FLAG`);
  }

    getModule(module_key: number): Observable<ModuleModel>{
      return this.http.get<any>(`${this.getModuledata}?module_key=${module_key}`);
    }
    addModule(module: ModuleModel): Observable<ModuleModel>{
      console.log(this.addModuledata + module);
      return this.http.post<ModuleModel>(this.addModuledata, module, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    updateModule(module: ModuleModel):Observable<void>{
      return this.http.post<void>(`${this.updateModuledata}`, module, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    deletemodule(MODULE_KEY:string, MODULE_CODE:string): Observable<any>{
      console.log(this.deleteModuledata,{ MODULE_KEY:`${MODULE_KEY}`, MODULE_CODE:`${MODULE_CODE}`});
      return this.http.post<any>(this.deleteModuledata,{MODULE_KEY:`${MODULE_KEY}`, MODULE_CODE:`${MODULE_CODE}`},{
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
    }

}
