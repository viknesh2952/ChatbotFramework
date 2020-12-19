import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modulegroupmodel} from 'src/app/models/modulegroup.model';
import {AppConfigService} from 'src/app/app-config.service';


@Injectable({
  providedIn: 'root'
})
export class ModulegroupApiService {
  protected dynamic=AppConfigService.settings;
  global;

  getModuleGroupdata;
  getProductdata;
  getReferenceDetail;
  addModuleGroupdata;
  updateModuleGroupdata;
  deleteModuleGroupdata;
  constructor(private http:HttpClient) {
    this.global=this.dynamic.global;
    this.getModuleGroupdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_module_group';
    this.getProductdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_product';
    this.getReferenceDetail=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_ref_codes_list';
    this.addModuleGroupdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'add_module_group_master';
    this.updateModuleGroupdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'update_module_group_master';
    this.deleteModuleGroupdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'delete_module_group_master';
  }

  getApiData(){
    return this.http.get(this.getModuleGroupdata);
  }
  getProductvalue(){
    return this.http.get(this.getProductdata);
  }
  getRefDetail(){ 
    return this.http.get(`${this.getReferenceDetail}?RCH_DOMAIN_NAME=T_TVS_CHATBOT_STORY.ACTIVE_FLAG`);
  }
  
  getModuleGroup(id: number): Observable<any> {
    return this.http.get<any>(`${this.getModuleGroupdata}?grp_module_id=${id}`);
  }
  addModuleGroup(ModuleGroup: Modulegroupmodel): Observable<Modulegroupmodel> {
    return this.http.post<Modulegroupmodel>(this.addModuleGroupdata, ModuleGroup, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  updateModuleGroup(ModuleGroup: Modulegroupmodel): Observable<void> {
        return this.http.post<void>(`${this.updateModuleGroupdata}`, ModuleGroup, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  deleteModuleGroup(MODGRP_KEY,MODGRP_PRODUCT_KEY): Observable<any> {
    return this.http.post<any>(this.deleteModuleGroupdata,
      {MODGRP_KEY:MODGRP_KEY,MODGRP_PRODUCT_KEY:MODGRP_PRODUCT_KEY},{
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  });
}
}