import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileApiService } from '../profileapi.service';
import { ProfileModel, ProfileUpdate } from 'src/app/models/Profile.model';
import { MenunameService } from 'src/app/menuname.service';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AppConfigService } from 'src/app/app-config.service';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';


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
export interface Refdetail {
  RCD_ABBREVIATION: string,
  RCD_DETAIL_KEY: number,
  RCD_HEADER_KEY: number,
  RCD_HIGH_RANGE: number,
  RCD_LOCK_KEY: number,
  RCD_LOW_RANGE: number,
  RCD_MEANING: string,
  RCD_ORDER_BY: number,
  RCD_SET_AS_DEFAULT: string,
  RCD_VALUE: string
}
export interface UserId {
  user_active_from: string,
  user_active_status: string,
  user_active_to: string,
  user_address_link: any,
  user_code: string,
  user_default_profile_key: number,
  user_display_name: string,
  user_first_name: string,
  user_key: number,
  user_last_name: any,
  user_lock_key: number,
  user_middle_name: any,
  user_password: any,
  user_profile_key: number
} 
const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html'
})
export class AddProfileComponent implements OnInit {

  expiry_list = [
    { value: 'Y', viewValue: 'Yes' },
    { value: 'N', viewValue: 'No' }
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  date = new FormControl(moment());
  today = new Date();
  min = new Date(this.today.setDate(this.today.getDate() - 1));
  @ViewChild('profileform') public createprofile: NgForm;
  isSubmitted: boolean = false;
  profile: ProfileModel;
  panelTitle: string;
  readonly: boolean = false;
  message: string;
  temp1: any;
  userdata: any;
  user_id: any;
  id: number;
  Displayname: string;
  getdata: any;
  update: ProfileUpdate;
  roleid: RoleId[] = [];
  role = null;
  RoleCtrl = new FormControl();
  filteredRoleId: Observable<RoleId[]>;
  refdetail: Refdetail[] = [];
  ref = null;
  RefDetailCtrl = new FormControl();
  filteredRefDetail: Observable<Refdetail[]>;
  userid: UserId[] = [];
  user = null;
  UserCtrl = new FormControl();
  filteredUserId: Observable<UserId[]>;
  dateString: any;
  dateValid: boolean = true;
  uprl_active_from;
  uprl_active_to;
  fromvalid: boolean = false;
  tovalid: boolean = false;
  from_past: boolean = false;
  to_past: boolean = false;
  protected dynamic = AppConfigService.settings;
  global;
  profile_key;

  constructor(
    private api: ProfileApiService,
    private menunameservice: MenunameService,
    private router: Router,
    private _route: ActivatedRoute,
    private location: Location,
    private datepipe: DatePipe,
    private snackBar: MatSnackBar) {
    this.global = this.dynamic.global;
    this.menunameservice.routeAuth('/Profile');
    this.api.GetRoleLookup().subscribe((data: any) => {
      for (let i = 0; i < data.message.length; i++) {
        if (data.message[i].role_active_status == 'Y') {
          this.roleid.push(data.message[i]);
        }
      }
    });
    this.api.GetUserMaster().subscribe((data: any) => {
      for (let i = 0; i < data.message.length; i++) {
        if (data.message[i].user_active_status == 'Y') {
          this.userid.push(data.message[i]);
        }
      }
    });
    this.api.getRefDetail().subscribe((data: any) => {
      for (let i = 0; i < data.message.length; i++) {
        this.refdetail.push(data.message[i]);
        if (data.message[i].RCD_SET_AS_DEFAULT == 'Y') {
          this.ref = data.message[i].RCD_ABBREVIATION;
        }
      }
    });
  }
  isNumber(value: string | number): boolean {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }

  private _filterRoleId(value: any): RoleId[] {
    const filterValue = value;
    return this.roleid.filter(id => id.role_description.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterUserId(value: any): UserId[] {
    const filterValue = value;
    return this.userid.filter(id => id.user_display_name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterRefDetail(value: any): Refdetail[] {
    const filterValue = value;
    return this.refdetail.filter(id => id.RCD_ABBREVIATION.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.filteredUserId = this.UserCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterUserId(id) : this.userid.slice())
        );

      this.filteredRoleId = this.RoleCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterRoleId(id) : this.roleid.slice())
        );

      this.filteredRefDetail = this.RefDetailCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterRefDetail(id) : this.refdetail.slice())
        );
    }, 2000);
    this._route.paramMap.subscribe(parameterMap => {
      this.id = +parameterMap.get('id');
      this._route.queryParams.subscribe(params => {
        this.readonly = (params['mode'] == 'read' ? true : false);
        this.Displayname = (params['name']);
      });
      this.getProfile(this.id, this.Displayname);
    });
    this.menunameservice.sharedMessage.subscribe(message => this.message = message);
    this.menunameservice.nextMessage(this.panelTitle);
    this.temp1 = JSON.parse(sessionStorage.getItem('user'));
    this.userdata = this.temp1.message;
    this.user_id = this.userdata[0].role_code;
    this.profile_key = this.userdata[0].uprl_profile_key;
  }
  formatDate(date) {
    return this.datepipe.transform(date, this.global.DATE_FORMAT_OUTPUT);
  }
  ///////////////
  isValidDate(dateString, param) {
    console.log('.')
    this.dateString = this.formatDate(dateString);
    if (this.dateString == null) {
      if (param == 1) {
        this.fromvalid = false;
      }
      else {
        this.tovalid = false;
      }
    }
    else {
      if (param == 1) {
        this.fromvalid = true;
      }
      else {
        this.tovalid = true;
      }
    }
  }

  chkpastcall(p: number) {
    if (this.from_past && p == 1) {
      this.chkpastDate(1);
      return true;
    }
    if (this.to_past && p == 2) {
      this.chkpastDate(2);
      return true;
    }
  }

  chkpastDate(p: number) {
    if (this.id == 0) {
      if (p == 1) {
        if (this.uprl_active_from < this.min) {
          this.from_past = true;
        }
        else {
          this.from_past = false;
        }
      }
      else {
        if (this.uprl_active_to < this.min) {
          this.to_past = true;
        }
        else {
          this.to_past = false;
        }
      }
    }
  }

  activeTo() {
    if (this.uprl_active_from == null || this.uprl_active_to == null) {
      console.log('Date is Null');
      return false;
    }
    if ((this.uprl_active_from._d != null && this.uprl_active_to._d != null) && (this.uprl_active_to._d) < (this.uprl_active_from._d)) {
      this.dateValid = false;
      return false;
    }
    else {
      this.dateValid = true;
      return true;
    }
  }
  ///////////////
  test(isvalid: boolean, sform: NgForm): void {
    if (this.uprl_active_from == null || this.uprl_active_to == null) {
      alert('Date is empty or Invalid');
      this.isSubmitted = true;
    }
    if ((this.uprl_active_from._d != null && this.uprl_active_to._d != null) && (this.uprl_active_to._d) < (this.uprl_active_from._d)) {
      this.dateValid = false;
    } 
    else {
      this.dateValid = true;
    }
    if (!this.fromvalid) {
      this.isValidDate(this.uprl_active_from, 1);
    }
    else {
      this.chkpastDate(1);
    }
    if (!this.tovalid) {
      this.isValidDate(this.uprl_active_to, 2);
    }
    else {
      this.chkpastDate(2);
    }
    if (this.uprl_active_from != null && this.uprl_active_to != null && !isvalid) {
      alert('Please fill out the mandatory fields');
      this.isSubmitted = true;
    }
    else {
      if (this.dateValid && this.fromvalid && this.tovalid) {
        if(this.id==0){
          if (!this.from_past && !this.to_past) {
            this.addtoApi(sform);
            // alert('API');
          }
          else {
            alert('Dont Enter Past Date');
            this.chkpastDate(1);
            this.chkpastDate(2);
          }
        }
        else{
          this.addtoApi(sform);
          // alert('API');
        }        
      }
      else {
        alert('Active To Date is lesser than Active From');
      }
    }
  }
  addtoApi(sform: NgForm): void {
    for (let i = 0; i < this.roleid.length; i++) {
      if (this.role == this.roleid[i].role_description) {
        this.profile.uprl_user_role_key = this.roleid[i].role_key;
        break;
      }
    }
    for (let i = 0; i < this.userid.length; i++) {
      if (this.user == this.userid[i].user_display_name) {
        this.profile.uprl_user_key = this.userid[i].user_key;
        break;
      }
    }
    for (let i = 0; i < this.refdetail.length; i++) {
      if (this.ref == this.refdetail[i].RCD_ABBREVIATION) {
        this.profile.uprl_active_status = this.refdetail[i].RCD_VALUE;
        break;
      }
    }
    this.profile.uprl_active_from = this.formatDate(this.uprl_active_from);
    this.profile.uprl_active_to = this.formatDate(this.uprl_active_to);
    if (this.id == 0) {
      this.profile.uprl_profile_key = this.profile_key;
      console.log(this.profile);
      this.api.addProfile(this.profile).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status == "success") {
            sform.reset();
            this.location.back();
            this.openSnackBar('Record Inserted Successfully!!!');
          }
        },
        (error: ProfileModel) => {
          console.log(error);
          this.openSnackBar('Record Not Inserted');
        }
      );
    }
    else {
      this.update = this.profile;
      this.api.updateProfile(this.update).subscribe((data: any) => {
        console.log(this.update);
        if (data.status == "success") {
          sform.reset();
          this.location.back();
          this.openSnackBar('Record Updated Successfully!!!');
        }
      },

        (error: ProfileUpdate) => {
          console.log(error);
          this.openSnackBar('Record Not Updated');
        }
      );
    }
  }
  private getProfile(id: number, name: string) {
    if (id === 0 || name == null) {
      this.profile = {
        uprl_active_from: null,
        uprl_active_status: null,
        uprl_active_to: null,
        uprl_default_printer: null,
        uprl_display_name: null,
        uprl_key: null,
        uprl_landing_program_key: null,
        uprl_profile_key: null,
        uprl_pwd_expire_days: null,
        uprl_pwd_never_expire: 'Y',
        uprl_user_key: null,
        uprl_user_profile_key: null,
        uprl_user_role_key: null
      };
      this.panelTitle = 'Add Profile User Role';
    }
    else {
      this.api.getProfile(id, name).subscribe(
        (data) => {
          console.log(data);
          this.getdata = data;
          this.profile = this.getdata.message[0];
          this.ref = this.profile.uprl_active_status;
          this.uprl_active_from = new Date(this.profile.uprl_active_from);
          this.uprl_active_to = new Date(this.profile.uprl_active_to);
          for (let i = 0; i < this.roleid.length; i++) {
            if (this.profile.uprl_user_role_key == this.roleid[i].role_key) {
              this.role = this.roleid[i].role_description;
              break;
            }
          }
        },
        (err: ProfileModel) => console.log(err)
      );
      this.panelTitle = 'Edit Profile User Role';
    }
    setTimeout(() => {
      for (let i = 0; i < this.refdetail.length; i++) {
        if (this.profile.uprl_active_status == this.refdetail[i].RCD_VALUE) {
          this.ref = this.refdetail[i].RCD_ABBREVIATION;
          break;
        }
      }
    }, 1000);
    setTimeout(() => {
      for (let i = 0; i < this.userid.length; i++) {
        if (this.profile.uprl_user_key == this.userid[i].user_key) {
          this.user = this.userid[i].user_display_name;
          break;
        }
      }
    }, 2000);
  }
  back() {
    this.menunameservice.nextMessage('Profile User Role Link');
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

