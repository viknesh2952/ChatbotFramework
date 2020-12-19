import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProfileHeaderModel} from '../models/profile-header.model';
import * as global from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ProfileHeaderApiService {
  getProfileHeaderdata=global.DOMAIN+':'+global.PORT+global.API_PREFIX+'get_profile_header_table';
  addProfileHeaderdata='';
  updateProfileHeaderdata='';
  deleteProfileHeaderdata='';
  constructor(private http:HttpClient) { }
  
  getApiData(){
    return this.http.get<ProfileHeaderModel>(this.getProfileHeaderdata);
  }
//   getProfileHeader(uprl_key: number,uprl_display_name:string): Observable<ProfileHeaderModel> {
//     return this.http.get<ProfileHeaderModel>(`${this.getProfileHeaderdata}?uprl_key=${uprl_key}&uprl_display_name=${uprl_display_name}`);
//   }
//   addProfileHeader(ProfileHeader: ProfileHeaderModel): Observable<ProfileHeaderModel> {
//     return this.http.post<ProfileHeaderModel>(this.addProfileHeaderdata, ProfileHeader, {
//         headers: new HttpHeaders({
//             'Content-Type': 'application/json'
//         })
//     });
//   }
//   updateProfileHeader(ProfileHeader: ProfileHeaderUpdate): Observable<void> {
//         return this.http.post<void>(`${this.updateProfileHeaderdata}`, ProfileHeader, {
//         headers: new HttpHeaders({
//             'Content-Type': 'application/json'
//         })
//     });
//   }
//   deleteProfileHeader(deldata:any): Observable<any> {
//     return this.http.post<any>(this.deleteProfileHeaderdata,deldata,{
//       headers: new HttpHeaders({
//           'Content-Type': 'application/json'
//       })
//   });
// }
}