import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent} from './login/login.component';
import { StoryMasterGridComponent} from './story-master/story-master-grid/story-master-grid.component';
import { AddStoryComponent } from './story-master/add-story/add-story.component';
import { UserMasterComponent} from './user-master/user-master-grid/user-master-grid.component';
import { AddUserComponent } from './user-master/add-user/add-user.component';
import { RoleMasterComponent} from './role-master/role-master-grid/role-master-grid.component'
import { addroleComponent}from './role-master/add-role/add-role.component';
import { ProductMasterComponent} from './product-master/product-master-grid/product-master-grid.component';
import { ProfileMasterComponent} from './profile-master/profile-grid/profile-master-grid.component'
import { ConfigComponent} from './config/config-grid/config-grid.component';
import { addConfigComponent} from './config/add-config/add-config.component';
import { AddProfileComponent} from './profile-master/add-profile/add-profile.component';
import { ModulegroupMasterGridComponent} from './module-group-master/module-group-master-grid/modulegroup-master-grid.component';
import { ProgramRoleGridComponent }from './program-role/program-role-grid/program-role-grid.component';
import { ProfileHeaderGridComponent} from './profile-header/profile-header-grid/profile-header-grid.component';
import { StoryApprovalComponent}from './story-approval/story-approval.component';
import { ModuleMasterComponent } from 'src/app/module-master/module-master-grid/module-master.component';
import { AddProductComponent}from './product-master/add-product/add-product.component';
import { AddprogramComponent} from './program-master/add-program/addprogram/addprogram.component'
import { SubModuleGridComponent } from './sub-module-master/sub-module-grid/sub-module-grid/sub-module-grid.component';
import { AddsubModuleComponent } from 'src/app/sub-module-master/add-sub-module/addsub-module/addsub-module.component';
import { AddmoduleComponent} from 'src/app/module-master/addmodule/addmodule.component';
import { UserSessionGridComponent } from './user-session-details/user-session-grid/user-session-grid.component';
import { AddProgramRoleComponent } from './program-role/add-program-role/add-program-role.component';
import { AddModuleGroupComponent } from './module-group-master/add-module-group/add-module-group.component';
import {ProfileHeaderTreeComponent} from './profile-header-tree/profile-header-tree.component';
import { ProgramMasterComponent } from './program-master/program master-grid/program-master.component';
import {AddRefCodesHeaderComponent} from './RefCodes/add-ref-codes-header/add-ref-codes-header.component';
import {RefCodesHeaderGridComponent} from './RefCodes/ref-codes-header-grid/ref-codes-header-grid.component';
import {AddRefCodesDetailComponent} from './RefCodes/add-ref-codes-detail/add-ref-codes-detail.component';
import {RefCodesDetailGridComponent} from './RefCodes/ref-codes-detail-grid/ref-codes-detail-grid.component';
import { ProductApprovalComponent } from './product-approval/product-approval.component';
import { ModuleGroupApprovalComponent } from './module-group-approval/module-group-approval.component';
import { ProfileUserRoleLinkApprovalComponent } from './profile-user-role-link-approval/profile-user-role-link-approval.component';
import { ChatbotContainerComponent } from './chatbot-container/chatbot-container.component';
const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Story/:appid', component: StoryMasterGridComponent },
  { path:'Storyedit/:id', component: AddStoryComponent },
  { path:'Storyedit/:appid/:id', component: AddStoryComponent },
  { path: 'StoryApproval', component: StoryApprovalComponent },
  { path: 'Profile', component: ProfileMasterComponent },
  { path:'Profileedit/:id', component: AddProfileComponent },
  { path: 'ProfileApproval', component: ProfileUserRoleLinkApprovalComponent },
  { path: 'User', component: UserMasterComponent },
  { path:'Useredit/:id', component: AddUserComponent },
  { path:'Useredit/:appid/:id', component: AddUserComponent },
  { path: 'Config', component: ConfigComponent },
  { path:'configedit/:id', component: addConfigComponent },
  { path: 'Role', component: RoleMasterComponent },
  { path:'Roleedit/:id', component: addroleComponent },
  { path: 'Product', component: ProductMasterComponent },
  { path:'Productedit/:id', component: AddProductComponent },
  { path: 'ProductApproval', component: ProductApprovalComponent },
  { path: 'ModuleGroup', component: ModulegroupMasterGridComponent },
  { path:'ModuleGroupedit/:id', component: AddModuleGroupComponent },
  { path: 'ModuleGroupApproval', component: ModuleGroupApprovalComponent },
  { path: 'ProgramRole', component: ProgramRoleGridComponent },
  { path:'ProgramRoleedit/:id', component: AddProgramRoleComponent },
  { path: 'ProfileHeader', component: ProfileHeaderGridComponent },
  { path: 'Module', component: ModuleMasterComponent },
  { path:'Moduleedit/:id', component: AddmoduleComponent },
  { path: 'Program', component: ProgramMasterComponent },
  { path:'Programedit/:id', component: AddprogramComponent },
  { path: 'Submodule', component: SubModuleGridComponent },
  { path:'submoduleedit/:id', component: AddsubModuleComponent },
  { path:'Profile-Tree', component: ProfileHeaderTreeComponent},
  { path: 'UserSession', component: UserSessionGridComponent },
  { path: 'RefCodes', component:RefCodesHeaderGridComponent},
  { path: 'RefCodesedit/:id', component:AddRefCodesHeaderComponent},
  { path: 'RefCodesDetail/:id', component:RefCodesDetailGridComponent},
  { path: 'RefCodesDetailedit/:header/:id', component:AddRefCodesDetailComponent},
  { path: 'ChatbotContainer/:id', component:ChatbotContainerComponent},
  
  
  { path:  '', redirectTo:'Login' , pathMatch:'full'},
  { path:'Notfound',component:PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page


];

@NgModule({

  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }



