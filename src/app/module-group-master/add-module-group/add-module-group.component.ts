import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ModulegroupApiService } from '../modulegroup-api.service';
import { MenunameService } from 'src/app/menuname.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AppConfigService } from 'src/app/app-config.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
 
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Modulegroupmodel } from 'src/app/models/modulegroup.model';

export interface AppId {
  PRODUCT_CODE: string,
  PRODUCT_KEY: number,
  PRODUCT_NAME: string
  PRODUCT_ACTIVE_FLAG: string,
  PRODUCT_ACTIVE_FROM: string,
  PRODUCT_ACTIVE_TO: string,
  PRODUCT_LOCK_KEY: number,
  PRODUCT_ORDER_BY: number,
  PRODUCT_DEPLOYED_URL: string
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

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-add-module-group',
  templateUrl: './add-module-group.component.html'
})
export class AddModuleGroupComponent implements OnInit {
  date = new FormControl(moment());
  today = new Date();
  min = new Date(this.today.setDate(this.today.getDate() - 1));
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('productform') public createproduct: NgForm;
  isSubmitted: boolean = false;
  modgrp: Modulegroupmodel;
  panelTitle: string = 'Add Module Group';
  disableappid: boolean = false;
  message: string;
  readonly: boolean;
  refdetail: Refdetail[] = [];
  ref = null;
  RefDetailCtrl = new FormControl();
  filteredRefDetail: Observable<Refdetail[]>;
  appid: AppId[] = [];
  product = null;
  AppCtrl = new FormControl();
  filteredAppId: Observable<AppId[]>;
  getdata: any;
  protected dynamic = AppConfigService.settings;
  global;
  id: number;
  dateString: any;
  dateValid: boolean = true;
  MODGRP_ACTIVE_FROM;
  MODGRP_ACTIVE_TO;
  fromvalid: boolean = false;
  tovalid: boolean = false;
  from_past: boolean = false;
  to_past: boolean = false;
  constructor(
    private api: ModulegroupApiService,
    private menunameservice: MenunameService,
    private router: Router,
    private _route: ActivatedRoute,
    private location: Location,
    private datepipe: DatePipe,
    private snackBar: MatSnackBar) {
    this.global = this.dynamic.global;
    this.menunameservice.routeAuth('/ModuleGroup');
    this.api.getProductvalue().subscribe((data: any) => {
      for (let i = 0; i < data.message.length; i++) {
        if (data.message[i].PRODUCT_ACTIVE_FLAG == 'Y') {
          this.appid.push(data.message[i]);
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
  private _filterAppId(value: any): AppId[] {
    const filterValue = value;
    return this.appid.filter(id => id.PRODUCT_NAME.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterRefDetail(value: any): Refdetail[] {
    const filterValue = value;
    return this.refdetail.filter(id => id.RCD_ABBREVIATION.toLowerCase().indexOf(filterValue) === 0);
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.filteredAppId = this.AppCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterAppId(id) : this.appid.slice())
        );

      this.filteredRefDetail = this.RefDetailCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterRefDetail(id) : this.refdetail.slice())
        );
    }, 2000);
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getModuleGroup(id);
      this.id = id;
    });
    this._route.queryParams.subscribe(params => {
      this.readonly = (params['mode'] == 'read' ? true : false);
    });
    this.menunameservice.sharedMessage.subscribe(message => this.message = message);
    this.menunameservice.nextMessage(this.panelTitle);
  }
  formatDate(date) {
    return this.datepipe.transform(date, this.global.DATE_FORMAT_OUTPUT);
  }
  //////////
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
        if (this.MODGRP_ACTIVE_FROM < this.min) {
          this.from_past = true;
        }
        else {
          this.from_past = false;
        }
      }
      else {
        if (this.MODGRP_ACTIVE_TO < this.min) {
          this.to_past = true;
        }
        else {
          this.to_past = false;
        }
      }
    }
  }

  activeTo() {
    if (this.MODGRP_ACTIVE_FROM == null || this.MODGRP_ACTIVE_TO == null) {
      console.log('Date is Null');
      return false;
    }
    if ((this.MODGRP_ACTIVE_FROM._d != null && this.MODGRP_ACTIVE_TO._d != null) && (this.MODGRP_ACTIVE_TO._d) < (this.MODGRP_ACTIVE_FROM._d)) {
      this.dateValid = false;
      return false;
    }
    else {
      this.dateValid = true;
      return true;
    }
  }
  //////////
  test(isvalid: boolean, sform: NgForm): void {
    if (this.MODGRP_ACTIVE_FROM == null || this.MODGRP_ACTIVE_TO == null) {
      alert('Date is empty or Invalid');
      this.isSubmitted = true;
    }
    if ((this.MODGRP_ACTIVE_FROM._d != null && this.MODGRP_ACTIVE_TO._d != null) && (this.MODGRP_ACTIVE_TO._d) < (this.MODGRP_ACTIVE_FROM._d)) {
      this.dateValid = false;
    }
    else {
      this.dateValid = true;
    }
    if (!this.fromvalid) {
      this.isValidDate(this.MODGRP_ACTIVE_FROM, 1);
    }
    else {
      this.chkpastDate(1);
    }
    if (!this.tovalid) {
      this.isValidDate(this.MODGRP_ACTIVE_TO, 2);
    }
    else {
      this.chkpastDate(2);
    }
    if (!isvalid) {
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
    for (let i = 0; i < this.appid.length; i++) {
      if (this.product == this.appid[i].PRODUCT_NAME) {
        this.modgrp.MODGRP_PRODUCT_KEY = this.appid[i].PRODUCT_KEY;
        break;
      }
    }
    for (let i = 0; i < this.refdetail.length; i++) {
      if (this.ref == this.refdetail[i].RCD_ABBREVIATION) {
        this.modgrp.MODGRP_ACTIVE_FLAG = this.refdetail[i].RCD_VALUE;
        break;
      }
    }
    this.modgrp.MODGRP_ACTIVE_FROM = this.formatDate(this.MODGRP_ACTIVE_FROM);
    this.modgrp.MODGRP_ACTIVE_TO = this.formatDate(this.MODGRP_ACTIVE_TO);
    if (this.modgrp.MODGRP_KEY == null) {
      this.api.addModuleGroup(this.modgrp).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status == "success") {
            sform.reset();
            this.location.back();
            this.openSnackBar('Record Inserted Successfully!!!');
          }
        },
        (error: Modulegroupmodel) => {
          console.log(error);
          this.openSnackBar('Record Not Inserted');
        }
      );
      console.log(this.modgrp);
    }
    else {
      this.api.updateModuleGroup(this.modgrp).subscribe((data: any) => {
        console.log(this.modgrp);
        if (data.status == "success") {
          sform.reset();
          this.location.back();
          this.openSnackBar('Record Updated Successfully!!!');
        }
      },
        (error: Modulegroupmodel) => {
          console.log(error);
          this.openSnackBar('Record Not Updated');
        }
      );
    }

  }
  private getModuleGroup(id: number) {
    if (id === 0) {
      this.modgrp = {
        MODGRP_KEY: null,
        MODGRP_PRODUCT_KEY: null,
        MODGRP_CODE: null,
        MODGRP_NAME: null,
        MODGRP_ORDER_BY: null,
        MODGRP_ACTIVE_FLAG: null,
        MODGRP_ACTIVE_FROM: null,
        MODGRP_ACTIVE_TO: null,
        MODGRP_LOCK_KEY: 0,
        MODGRP_APPLICABILITY: null
      };
      this.panelTitle = 'Add Module Group';
    }
    else {
      this.api.getModuleGroup(id).subscribe(
        (data) => {
          this.getdata = data;
          this.modgrp = this.getdata.message[0];
          console.log(this.modgrp);
          this.ref = this.modgrp.MODGRP_ACTIVE_FLAG;
          this.MODGRP_ACTIVE_FROM = new Date(this.modgrp.MODGRP_ACTIVE_FROM);
          this.MODGRP_ACTIVE_TO = new Date(this.modgrp.MODGRP_ACTIVE_TO);
          for (let i = 0; i < this.appid.length; i++) {
            if (this.modgrp.MODGRP_PRODUCT_KEY == this.appid[i].PRODUCT_KEY) {
              this.product = this.appid[i].PRODUCT_NAME;
              break;
            }
          }
        });
      this.panelTitle = 'Edit Module Group';
    }
    setTimeout(() => {
      for (let i = 0; i < this.refdetail.length; i++) {
        if (this.modgrp.MODGRP_ACTIVE_FLAG == this.refdetail[i].RCD_VALUE) {
          this.ref = this.refdetail[i].RCD_ABBREVIATION;
          break;
        }
      }
    }, 800)
  }
  back() {
    this.menunameservice.nextMessage('Module Group Master');
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




