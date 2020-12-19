import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSessionDetails, UserSessionDetails1 } from 'src/app/models/user-session.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MenunameService } from 'src/app/menuname.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { UserSessionApiService } from '../user-session-api.service';

const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-add-user-session',
  templateUrl: './add-user-session.component.html',
  styleUrls: ['./add-user-session.component.css']
})
export class AddUserSessionComponent implements OnInit {
  usersessiondetail:UserSessionDetails;
  usersessiondetail1:UserSessionDetails1;
  date = new FormControl(moment());
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('usersessiondetailform') public createproduct: NgForm;
  isSubmitted: boolean =false;
  panelTitle: string='Add Product';
  readonly:boolean;
  disableappid: boolean = false;
  message: string;
  idval: number;
  jk: any;
  isDisabled:boolean = true;
  constructor(private location: Location,private _route: ActivatedRoute,private snackBar: MatSnackBar,
    private menunameservice: MenunameService, private datepipe: DatePipe,private api:UserSessionApiService
    ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.readonly = (params['mode'] == 'read' ? true : false);
    });
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      //this.app_id = +parameterMap.get('appid');
      this.getProduct(id);
    });
  }
  test(isvalid: boolean, sform: NgForm): void {
    if (!isvalid) {
      alert('Please fill out the mandatory fields');
      this.isSubmitted = true;
    }
    else {
      console.log('add');
      this.addtoApi(sform);
    }
  }
  addtoApi(sform: NgForm): void {
    
    
    
       if (this.idval == 0) {
       this.api.addUserSessionDetails(this.usersessiondetail).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status == "success") {
            sform.reset();
            this.location.back();
            this.openSnackBar('Record Inserted Successfully!!!');
          }
        },
        (error: UserSessionDetails) => {
          console.log(error);
          this.openSnackBar('Record Not Inserted');
        }
      );
      console.log(this.usersessiondetail);
    }
    else {
      this.isDisabled=true;
      this.usersessiondetail1={
        usd_key:this.idval,
        usd_session_id: this.usersessiondetail.usd_session_id,
        usd_user_key: this.usersessiondetail.usd_user_key,
        usd_user_profile_role_key: this.usersessiondetail.usd_user_profile_role_key,
        usd_login_on: this.usersessiondetail.usd_login_on,
        usd_last_db_access: this.usersessiondetail.usd_last_db_access,
        ush_time_zone: this.usersessiondetail.ush_time_zone,
        ush_active_status: this.usersessiondetail.ush_active_status,
        ush_purge_on: this.usersessiondetail.ush_purge_on,
        ush_logout_on: this.usersessiondetail.ush_logout_on,
        ush_ip_address: this.usersessiondetail.ush_ip_address,
        ush_created_on: this.usersessiondetail.ush_created_on,
        ush_lock_key: this.usersessiondetail.ush_lock_key,
      };
      console.log(this.usersessiondetail1);
      this.api.updateUserSessionDetails(this.usersessiondetail1).subscribe((data:any) => {
        console.log(this.usersessiondetail);
        if (data.status == "success") {
          sform.reset();
          this.location.back();
          this.openSnackBar('Record Updated Successfully!!!');
        }
      },
        (error: UserSessionDetails) => { console.log(error);
          this.openSnackBar('Record Not Updated'); }
      );
  }
    
}
  private getProduct(id: number) {
    
    this.idval =id;
    if (id === 0) {
      this.isDisabled = false;
      this.usersessiondetail = {
        usd_session_id: null,
        usd_user_key: null,
        usd_user_profile_role_key: null,
        usd_login_on: null,
        usd_last_db_access: null,
        ush_time_zone: null,
        ush_active_status: null,
        ush_purge_on: null,
        ush_logout_on: null,
        ush_ip_address: null,
        ush_created_on: null,
        ush_lock_key: null,
      };
      this.panelTitle = 'Add product';
    }
    else {
      
      this.api.getApiDatakey(id).subscribe(
        (data:any) => {
          //this.getdata = data;
          //jk = new FormControl(new Date());
          this.usersessiondetail = {
            usd_session_id: data.message[0].usd_session_id,
            usd_user_key: data.message[0].usd_user_key,
            usd_user_profile_role_key: data.message[0].usd_user_profile_role_key,
            usd_login_on: data.message[0].usd_login_on,
            usd_last_db_access: data.message[0].usd_last_db_access,
            ush_time_zone: data.message[0].ush_time_zone,
            ush_active_status: data.message[0].ush_active_status,
            ush_purge_on: data.message[0].ush_purge_on,
            ush_logout_on: data.message[0].ush_logout_on,
            ush_ip_address: data.message[0].ush_ip_address,
            ush_created_on: data.message[0].ush_created_on,
            ush_lock_key: data.message[0].ush_lock_key,
          };
          console.log(this.usersessiondetail);
         // this.ref=this.product.PRODUCT_ACTIVE_FLAG;
        });
      this.panelTitle = 'Edit product';
    }
  //   setTimeout(()=>{
  //     for(let i=0;i<this.refdetail.length;i++){
  //       if(this.product.PRODUCT_ACTIVE_FLAG==this.refdetail[i].RCD_VALUE){
  //         this.ref=this.refdetail[i].RCD_ABBREVIATION;
  //         break;
  //       }
  //   }
  // },800)
    
  }
  back() {
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
