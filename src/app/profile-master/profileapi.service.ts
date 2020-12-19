import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileModel, ProfileUpdate } from '../models/profile.model';
import { RoleModel } from '../models/role.model';
import { AppConfigService } from 'src/app/app-config.service';



@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  protected dynamic = AppConfigService.settings;
  global;

  getProfiledata;
  getRoleMaster;
  getUserdata;
  getReferenceDetail;
  getProgram;
  addProfiledata;
  updateProfiledata;
  deleteProfiledata;
  constructor(private http: HttpClient) {
    this.global = this.dynamic.global;

    this.getProfiledata = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'Profile_master_get_list';
    this.getRoleMaster = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'Role_master_get_list';
    this.getUserdata = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'User_master_get_list';
    this.getReferenceDetail = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'get_ref_codes_list';
    this.getProgram = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'get_program_master_table';
    this.addProfiledata = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'add_user_in_profile_user_role_link';
    this.updateProfiledata = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'update_user_in_profile_user_role_link';
    this.deleteProfiledata = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'delete_user_from_profile_user_role_link';
  }
  getApiData() {
    return this.http.get<ProfileModel>(this.getProfiledata);
  }
  GetRoleLookup() {
    return this.http.get<RoleModel>(this.getRoleMaster);
  }
  GetUserMaster() {
    return this.http.get<RoleModel>(this.getUserdata);
  }
  getProgrammaster() {
    return this.http.get<any>(this.getProgram);
  }
  getRefDetail() {
    return this.http.get(`${this.getReferenceDetail}?RCH_DOMAIN_NAME=T_TVS_CHATBOT_STORY.ACTIVE_FLAG`);
  }
  getProfile(uprl_key: number, uprl_display_name: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${this.getProfiledata}?uprl_key=${uprl_key}&uprl_display_name=${uprl_display_name}`);
  }
  addProfile(Profile: ProfileModel): Observable<ProfileModel> {
    return this.http.post<ProfileModel>(this.addProfiledata, Profile, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  updateProfile(Profile: ProfileUpdate): Observable<void> {
    return this.http.post<void>(`${this.updateProfiledata}`, Profile, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  deleteProfile(deldata: any): Observable<any> {
    return this.http.post<any>(this.deleteProfiledata, deldata, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
} 