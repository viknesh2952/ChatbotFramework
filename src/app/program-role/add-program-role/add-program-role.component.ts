import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProgramroleApiService } from '../programrole-api.service';
import { MenunameService } from 'src/app/menuname.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import {AppConfigService} from 'src/app/app-config.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ProgramRoleModel } from 'src/app/models/program-role.model';
 
export interface RoleId {
    role_active_from: string,
    role_active_status: string,
    role_active_to: string,
    role_code: string,
    role_description: string,
    role_key: number,
    role_lock_key: number,
    role_profile_key: number
}
export interface ProgramId {
  program_access_control:number,
  program_active_from:string,
  program_active_status:string,
  program_active_to:string,
  program_code:string,
  program_description:string,
  program_icon_path:string,
  program_key:number,
  program_lock_key:number,
  program_order:number,
  program_page_name:number,
  program_page_path:string,
  program_parent_key:number,
  program_profile_key:number,
  program_type:string
}

@Component({
  selector: 'app-add-program-role',
  templateUrl: './add-program-role.component.html'
})
export class AddProgramRoleComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('programroleform') public createprogramrole: NgForm;
  isSubmitted: boolean = false;
  prole:ProgramRoleModel;
  panelTitle: string='Add Program Role';
  disableappid: boolean = false;
  message: string;
  readonly:boolean;
  getdata: any;
  roleid: RoleId[] = [];
  role = null;
  RoleCtrl = new FormControl();
  filteredRoleId: Observable<RoleId[]>;
  programid: ProgramId[] = [];
  program = null;
  ProgramCtrl = new FormControl();
  filteredProgramId: Observable<ProgramId[]>;
  protected dynamic=AppConfigService.settings;
  global;

  constructor(
    private api: ProgramroleApiService,
    private menunameservice: MenunameService,
    private router: Router,
    private _route: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar) {
      this.global=this.dynamic.global;
      this.menunameservice.routeAuth('/ProgramRole');
      this.api.getRolemaster().subscribe((data: any) => {
        for (let i = 0; i < data.message.length; i++) {
          if(data.message[i].role_active_status=='Y'){
            this.roleid.push(data.message[i]);
          }
        }
      });
      this.api.getProgrammaster().subscribe((data: any) => {
        for (let i = 0; i < data.message.length; i++) {
          if(data.message[i].program_active_status=='Y'){
            this.programid.push(data.message[i]);
          }
        }
      });
    }
    private _filterRoleId(value: any): RoleId[] {
      const filterValue = value;
      return this.roleid.filter(id => id.role_description.toLowerCase().indexOf(filterValue) === 0);
    }
    private _filterProgramId(value: any): ProgramId[] {
      const filterValue = value;
      return this.programid.filter(id => id.program_description.toLowerCase().indexOf(filterValue) === 0);
    }
  ngOnInit(): void {
    setTimeout(() => {
      this.filteredRoleId = this.RoleCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterRoleId(id) : this.roleid.slice())
        );
        this.filteredProgramId = this.ProgramCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterProgramId(id) : this.programid.slice())
        );
      },2000);
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getprole(id);
    });
    this._route.queryParams.subscribe(params => {
      this.readonly = (params['mode'] == 'read' ? true : false);
    });
    this.menunameservice.sharedMessage.subscribe(message => this.message = message);
    this.menunameservice.nextMessage(this.panelTitle);
  }
  test(isvalid: boolean, sform: NgForm): void {
    if (!isvalid) {
      alert('Please fill out the mandatory fields');
      this.isSubmitted = true;
    }
    else {
      this.addtoApi(sform);
    }
  }
  addtoApi(sform: NgForm): void {
    for (let i = 0; i < this.roleid.length; i++) {
      if (this.role == this.roleid[i].role_description) {
        this.prole.prro_role_key = this.roleid[i].role_key;
        break;
      }
    }
    for (let i = 0; i < this.programid.length; i++) {
      if (this.program == this.programid[i].program_description) {
        this.prole.prro_program_key = this.programid[i].program_key;
        break;
      }
    }
    console.log(this.prole);
      if (this.prole.prro_key == null) {
       this.api.addProgramRole(this.prole).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status == "success") {
            sform.reset();
            this.location.back();
            this.openSnackBar('Record Inserted Successfully!!!');
          }
        },
        (error: ProgramRoleModel) => {
          console.log(error);
          this.openSnackBar('Record Not Inserted');
        }
      );
      console.log(this.prole);
    }
    else {
      this.api.updateProgramRole(this.prole).subscribe((data:any) => {
        console.log(this.prole);
        if (data.status == "success") {
          sform.reset();
          this.location.back();
          this.openSnackBar('Record Updated Successfully!!!');
        }
      },
        (error: ProgramRoleModel) => { console.log(error);
          this.openSnackBar('Record Not Updated'); }
      );
  }
}
  private getprole(id: number) {
    if (id === 0) {
      this.prole = {
         prro_access_control: null,
         prro_key: null,
         prro_lock_key: 0,
         prro_program_key: null,
         prro_role_key: null
      };
      this.panelTitle = 'Add Program Role';
    }
    else {
      this.api.getProgramRole(id).subscribe(
        (data) => {
          this.getdata = data;
          this.prole = this.getdata.message[0];
          console.log(this.prole);
          for (let i = 0; i < this.roleid.length; i++) {
            if (this.prole.prro_role_key == this.roleid[i].role_key) {
              this.role = this.roleid[i].role_description;
              break;
            }
          }
          for (let i = 0; i < this.programid.length; i++) {
            if (this.prole.prro_program_key == this.programid[i].program_key) {
              this.program = this.programid[i].program_description;
              break;
            }
          }
        });
      this.panelTitle = 'Edit Program Role';
    }
    
  }
  back() {
    this.menunameservice.nextMessage('Program Role Link');
    this.location.back();
  }
  openSnackBar(msg) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
 
}    
