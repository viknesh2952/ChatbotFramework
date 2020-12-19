import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { RefCodesHeader,RefCodesDetail} from 'src/app/models/refcodes.model';
import {AppConfigService} from 'src/app/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class RefcodesApiService {
  protected dynamic=AppConfigService.settings;
  global;

  getrefheader;
  addRefcodesheader;
  updateRefcodesheader;
  getrefdetail;
  addRefcodesdetail;
  updateRefcodesdetail;
  getProductdata;
  getModuleId;
  constructor(private http:HttpClient) {
    this.global=this.dynamic.global;
    this.getrefheader=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_reference_codes_header';
    this.addRefcodesheader=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'add_reference_codes_header';
    this.updateRefcodesheader=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'update_reference_codes_header';
    this.getrefdetail=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_reference_codes_detail';
    this.addRefcodesdetail=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'add_reference_codes_detail';
    this.updateRefcodesdetail=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'update_reference_codes_detail';
    this.getProductdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_product';
    this.getModuleId=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_module';
  }

  getApiData(){
    return this.http.get(this.getrefheader);
  }
  getRefHeader(id:number){
    return this.http.get(`${this.getrefheader}?RCH_HEADER_KEY=${id}`);
  }
  getProductvalue(){
    return this.http.get(this.getProductdata);
  }
  getModule(app_id){
    return this.http.get(`${this.getModuleId}?app_id=${app_id}`);
  }
  addRefHeader(RefHeader: RefCodesHeader): Observable<RefCodesHeader> {
    return this.http.post<RefCodesHeader>(this.addRefcodesheader, RefHeader, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  updateRefHeader(h,m,p,l,d,dn,t): Observable<void> {
    var refheader:any={
      RCH_HEADER_KEY:h,
      RCH_MODULE_KEY:m,
      RCH_PRODUCT_KEY:p,
      RCH_LOCK_KEY:l,
      RCH_DESCRIPTION:d,
      RCH_DOMAIN_NAME:dn,
      RCH_DOMAIN_TYPE:t
    }
    console.log(refheader);
    
        return this.http.post<void>(`${this.updateRefcodesheader}`, refheader, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  getRefDetail(id:number){
    return this.http.get(`${this.getrefdetail}?RCD_HEADER_KEY=${id}`);
  }
  getDetaildata(header:number,id:number){
    return this.http.get(`${this.getrefdetail}?RCD_DETAIL_KEY=${id}&RCD_HEADER_KEY=${header}`);
  }
  addRefDetail(RefDetail: RefCodesDetail): Observable<RefCodesDetail> {
    return this.http.post<RefCodesDetail>(this.addRefcodesdetail, RefDetail, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  updateRefDetail(RefDetail: RefCodesDetail): Observable<void> {
        return this.http.post<void>(`${this.updateRefcodesdetail}`, RefDetail, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
}
