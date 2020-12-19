import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramModel } from 'src/app/models/program.model';
import {AppConfigService} from 'src/app/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramMasterApiService {
  protected dynamic=AppConfigService.settings;
  global;


  getUserdata;
  addUserdata;
  updateUserdata;
  deleteUserdata;
  getProductdata;
  getReferenceDetail;
  constructor(private http:HttpClient) {
    this.global=this.dynamic.global;
    this.getUserdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_program_master_table';
    this.addUserdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'add_program';
    this.updateUserdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'update_program';
    this.deleteUserdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'delete_program'
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



  getprogram(program_key: number): Observable<ProgramModel> {
    return this.http.get<any>(`${this.getUserdata}?program_key=${program_key}`);
  }
  addprogram(program: ProgramModel): Observable<ProgramModel> {
    console.log(this.addUserdata + program);
    return this.http.post<ProgramModel>(this.addUserdata, program, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  updateprogram(program: ProgramModel): Observable<void> {
        return this.http.post<void>(`${this.updateUserdata}`, program, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  deleteprogram(program_key:string, program_code:string): Observable<any> {
    console.log( this.deleteUserdata,{program_key:`${program_key}`, program_code:`${program_code}`});
    return this.http.post<any>(this.deleteUserdata,{program_key:`${program_key}`, program_code:`${program_code}`},{
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }

}

