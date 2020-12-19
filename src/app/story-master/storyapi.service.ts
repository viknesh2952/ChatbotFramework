import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoryModel , StoryUpdate} from '../models/story.model';
import {AppConfigService} from 'src/app/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class StoryApiService {
  protected dynamic=AppConfigService.settings;
  global;

  login_Url;
  getStoryTabledata;
  getStorydata;
  addStorydata;
  updateStorydata;
  deleteStorydata;
  getProductdata;
  getSubmoduleId;
  getModuleId;
  storyOutput;
  updatestoryOutput;
  storyApi;
  storyParams;
  getReferenceDetail;
  constructor(private http:HttpClient) { 
    this.global=this.dynamic.global;
    
  this.login_Url=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'user_login';
  this.getStoryTabledata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_chatbot_story_table';
  this.getStorydata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_stories';
  this.addStorydata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'add_story';
  this.updateStorydata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'update_story';
  this.deleteStorydata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'delete_story';
  this.getProductdata=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_product';
  this.getSubmoduleId=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_submodule_by_module';
  this.getModuleId=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_module';
  this.getReferenceDetail=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_ref_codes_list';
  this.storyOutput=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_story_output_column';
  this.storyApi=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_story_api';
  this.storyParams=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'get_story_api_parametersql';
  this.updatestoryOutput=this.global.DOMAIN+':'+this.global.PORT+this.global.API_PREFIX+'update_story_output_column';
  }
  getProduct(){
    return this.http.get(this.getProductdata);
  }
  getSubModule(app_id,module_id){
    return this.http.get(`${this.getSubmoduleId}?app_id=${app_id}&module_id=${module_id}`);
  }
  getModule(app_id){
    return this.http.get(`${this.getModuleId}?app_id=${app_id}`);
  }
  getApiData(){
    return this.http.get(this.getStoryTabledata);
  }  
  getStoryOutput(intent){
    return this.http.get(`${this.storyOutput}?res_intent=${intent}`);
  }
  updateStoryOutput(story):Observable<any>{
    return this.http.post<any>(this.updatestoryOutput,story,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    })
  }
  getStoryApi(intent){
    return this.http.get(`${this.storyApi}?cas_intent=${intent}`);
  }
  getStoryParams(choice,intent){
    if(choice==1){
      return this.http.get(`${this.storyParams}?PARAMETERNAME=${intent}`);
    }
    if(choice==2){
      return this.http.get(`${this.storyParams}?INTENT=${intent}`);
    }
  }
  getRefDetail(){ 
    return this.http.get(`${this.getReferenceDetail}?RCH_DOMAIN_NAME=T_TVS_CHATBOT_STORY.ACTIVE_FLAG`);
  }
  getSubstorymenu(app_id:number){
    return this.http.get(`${this.getStorydata}?app_id=${app_id}`);
  }
  login(user_id:string,user_password:string): Observable< any > {
    return this.http.post<any>(this.login_Url, {"user_id":`${user_id}`,"user_password":`${user_password}`}, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  getStory(story_id: number): Observable<any> {
    return this.http.get<any>(`${this.getStoryTabledata}?story_id=${story_id}`);
  }
  addstory(story: StoryModel): Observable<StoryModel> {
    return this.http.post<StoryModel>(this.addStorydata, story, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  updatestory(story: StoryUpdate): Observable<void> {
        return this.http.post<void>(`${this.updateStorydata}`, story, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  deletestory(story_id:any): Observable<any> {
    var del_story={
      story_id:story_id
    }
    return this.http.post<any>(this.deleteStorydata,del_story,{
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  });
}
}