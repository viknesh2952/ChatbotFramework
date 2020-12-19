import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_INITIALIZER } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {QuillModule} from 'ngx-quill';
import { DatePipe } from '@angular/common';


import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddStoryComponent } from './story-master/add-story/add-story.component';
import { StoryMasterGridComponent } from './story-master/story-master-grid/story-master-grid.component';
import { AddUserComponent } from './user-master/add-user/add-user.component';
import { UserMasterComponent } from './user-master/user-master-grid/user-master-grid.component'
import { HomeComponent } from './home/home.component';
import { RoleMasterComponent } from './role-master/role-master-grid/role-master-grid.component';
import { addroleComponent } from './role-master/add-role/add-role.component';
import { ProductMasterComponent } from './product-master/product-master-grid/product-master-grid.component';
import { ConfigComponent } from './config/config-grid/config-grid.component';
import { addConfigComponent } from './config/add-config/add-config.component';
import { ProfileMasterComponent } from './profile-master/profile-grid/profile-master-grid.component';
import { AddProfileComponent } from './profile-master/add-profile/add-profile.component';
import { ModulegroupMasterGridComponent } from './module-group-master/module-group-master-grid/modulegroup-master-grid.component';
import { ProgramRoleGridComponent } from './program-role/program-role-grid/program-role-grid.component';
import {ProfileHeaderGridComponent} from './profile-header/profile-header-grid/profile-header-grid.component'


import {StoryApiService} from './story-master/storyapi.service';
import {UserApiService} from './Userapi.service';
import {ProfileApiService} from './profile-master/profileapi.service';
import { RolemasterApiService } from './Rolemasterapi.service';
import { ProductmasterApiService } from './product-master/Productmasterapi.service';
import { ConfigApiService } from './Configapi.service';
import { ModulegroupApiService } from './module-group-master/modulegroup-api.service';
import {ProgramroleApiService} from './program-role/programrole-api.service';
import { ProfileHeaderApiService } from './profile-header/profileheader-api.service';
import {AppConfigService} from './app-config.service';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as global from '../config';
import { StoryApprovalComponent } from './story-approval/story-approval.component';
import { ModuleMasterComponent } from './module-master/module-master-grid/module-master.component';
import { AddProductComponent } from './product-master/add-product/add-product.component' ;
import { AddprogramComponent } from './program-master/add-program/addprogram/addprogram.component';
import { SubModuleGridComponent } from './sub-module-master/sub-module-grid/sub-module-grid/sub-module-grid.component';
import { AddsubModuleComponent } from './sub-module-master/add-sub-module/addsub-module/addsub-module.component';
import { AddmoduleComponent } from './module-master/addmodule/addmodule.component';
import { AddModuleGroupComponent } from './module-group-master/add-module-group/add-module-group.component';
import { UserSessionGridComponent } from './user-session-details/user-session-grid/user-session-grid.component';
import { AddUserSessionComponent } from './user-session-details/add-user-session/add-user-session.component';
import { AddProgramRoleComponent } from './program-role/add-program-role/add-program-role.component';
import { ProfileHeaderTreeComponent } from './profile-header-tree/profile-header-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import {ProgramMasterComponent} from './program-master/program master-grid/program-master.component';
import { RefCodesHeaderGridComponent } from './RefCodes/ref-codes-header-grid/ref-codes-header-grid.component';
import { AddRefCodesHeaderComponent } from './RefCodes/add-ref-codes-header/add-ref-codes-header.component';
import { AddRefCodesDetailComponent } from './RefCodes/add-ref-codes-detail/add-ref-codes-detail.component';
import { RefCodesDetailGridComponent } from './RefCodes/ref-codes-detail-grid/ref-codes-detail-grid.component';
import { ProductApprovalComponent } from './product-approval/product-approval.component';
import { ModuleGroupApprovalComponent } from './module-group-approval/module-group-approval.component';
import { ProfileUserRoleLinkApprovalComponent } from './profile-user-role-link-approval/profile-user-role-link-approval.component';
import { ChatbotContainerComponent } from './chatbot-container/chatbot-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


export function initializeApp(appConfigService: AppConfigService) {
  return (): Promise<any> => { 
    return appConfigService.load();
  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@NgModule({
  declarations: [
    AppComponent,LoginComponent,PageNotFoundComponent, StoryMasterGridComponent,
    AddStoryComponent, HomeComponent, AddUserComponent, UserMasterComponent,RoleMasterComponent,
   addroleComponent,ProductMasterComponent,ConfigComponent,addConfigComponent,ProfileMasterComponent,AddProfileComponent,
   ModulegroupMasterGridComponent,ProgramRoleGridComponent,ProfileHeaderGridComponent, StoryApprovalComponent, ModuleMasterComponent, AddProductComponent,
    AddprogramComponent, SubModuleGridComponent, AddsubModuleComponent, AddmoduleComponent, AddModuleGroupComponent, UserSessionGridComponent, AddUserSessionComponent, AddProgramRoleComponent,ProfileHeaderTreeComponent,ProgramMasterComponent, RefCodesHeaderGridComponent, AddRefCodesHeaderComponent, AddRefCodesDetailComponent, RefCodesDetailGridComponent, ProductApprovalComponent, ModuleGroupApprovalComponent, ProfileUserRoleLinkApprovalComponent, ChatbotContainerComponent
  ],
  imports: [
    BrowserModule,MatTreeModule,
    AppRoutingModule,ReactiveFormsModule,FormsModule,
    BrowserAnimationsModule,MaterialModule,HttpClientModule,FlexLayoutModule,
    AgGridModule.withComponents([]),QuillModule.forRoot(), NgbModule
  ],
  providers: [StoryApiService,UserApiService,RolemasterApiService,ProductmasterApiService,
    ProfileApiService,ConfigApiService,ModulegroupApiService,ProgramroleApiService,
    ProfileHeaderApiService,DatePipe,AppConfigService,
    { provide: APP_INITIALIZER,useFactory: initializeApp, deps: [AppConfigService], multi: true},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE,MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


