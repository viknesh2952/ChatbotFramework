import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProgramRoleModel} from '../models/program-role.model';
import { RoleModel } from '../models/role.model';
import {AppConfigService} from 'src/app/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramroleApiService {
  protected dynamic=AppConfigService.settings;
  global;

  getProgramRoledata;
  getRoleMaster;
  addProgramRoledata;
  updateProgramRoledata;
  getProgram;
  constructor(private http:HttpClient) { 
    this.global=this.dynamic.global;
    this.getProgramRoledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_program_user_role_table';
    this.getRoleMaster=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'Role_master_get_list';
    this.addProgramRoledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'add_program_role_link';
    this.updateProgramRoledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'update_program_role_link';
    this.getProgram=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_program_master_table';
  }
  
  getApiData(){
    return this.http.get<ProgramRoleModel>(this.getProgramRoledata);
  }
  getRolemaster(){
    return this.http.get<RoleModel>(this.getRoleMaster);
  }
  getProgrammaster(){
    return this.http.get<any>(this.getProgram);
  }
  getProgramRole(prro_key: number): Observable<ProgramRoleModel> {
    return this.http.get<ProgramRoleModel>(`${this.getProgramRoledata}?prro_key=${prro_key}`);
  }
  addProgramRole(ProgramRole: ProgramRoleModel): Observable<ProgramRoleModel> {
    return this.http.post<ProgramRoleModel>(this.addProgramRoledata, ProgramRole, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  updateProgramRole(ProgramRole: ProgramRoleModel): Observable<void> {
        return this.http.post<void>(`${this.updateProgramRoledata}`, ProgramRole, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
}