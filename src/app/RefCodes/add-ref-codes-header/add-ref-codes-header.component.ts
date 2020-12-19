import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { RefcodesApiService } from '../refcodes-api.service';
import { MenunameService } from 'src/app/menuname.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { RefCodesHeader } from 'src/app/models/refcodes.model';
import { HomeComponent } from 'src/app/home/home.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
export interface ModuleId {
  MODULE_ACTIVE_FLAG: string,
  MODULE_ACTIVE_FROM: string,
  MODULE_ACTIVE_TO: string,
  MODULE_APPLICABILITY: string,
  MODULE_CODE: string,
  MODULE_ICON: number,
  MODULE_KEY: number,
  MODULE_LOCK_KEY: number,
  MODULE_NAME: string,
  MODULE_ORDER_BY: number,
  MODULE_PAGE: any,
  MODULE_PARENT_KEY: any,
  MODULE_PASSWORD_REQUIRED: any,
  MODULE_PATH: string,
  MODULE_PREFIX: string,
  MODULE_PRODUCT_KEY: string
}
@Component({
  selector: 'app-add-ref-codes-header',
  templateUrl: './add-ref-codes-header.component.html',
  styleUrls: ['./add-ref-codes-header.component.css']
})
export class AddRefCodesHeaderComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('refheaderform') public createrefheader: NgForm;
  isSubmitted: boolean = false;
  refheader: RefCodesHeader;
  panelTitle: string = 'Add ReferenceCodes Header';
  message: string;
  readonly: boolean;
  getdata: any;
  h: number;
  m: number;
  p: number;
  l: number;
  d: string;
  t: string;
  dn: string;
  appid: AppId[] = [];
  product = null;
  AppCtrl = new FormControl();
  filteredAppId: Observable<AppId[]>;
  moduleid: ModuleId[] = [];
  module = null;
  ModuleCtrl = new FormControl();
  filteredModuleId: Observable<ModuleId[]>;
  Domain_type = [
    { value: 'S', viewValue: 'SYSTEM' },
    { value: 'U', viewValue: 'USER' }
  ];
  constructor(
    private api: RefcodesApiService,
    private menunameservice: MenunameService,
    private home:HomeComponent,
    private _route: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar) {
      this.menunameservice.routeAuth('/RefCodes');
      this.api.getProductvalue().subscribe((data: any) => {
        for (let i = 0; i < data.message.length; i++) {
          if (data.message[i].PRODUCT_ACTIVE_FLAG == 'Y') {
            this.appid.push(data.message[i]);
          }
        }
      });
  }
  private _filterAppId(value: any): AppId[] {
    const filterValue = value;
    return this.appid.filter(id => id.PRODUCT_NAME.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterModuleId(value: any): ModuleId[] {
    const filterValue = value;
    return this.moduleid.filter(id => id.MODULE_NAME.toLowerCase().indexOf(filterValue) === 0);
  }
  ngOnInit(): void {    
    setTimeout(() => {
      this.filteredAppId = this.AppCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterAppId(id) : this.appid.slice())
        );
    }, 1000);
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getRefheader(id);
    });
    this._route.queryParams.subscribe(params => {
      this.readonly = (params['mode'] == 'read' ? true : false);
    });
    this.menunameservice.sharedMessage.subscribe(message => this.message = message);
    this.menunameservice.nextMessage(this.panelTitle);
  }
  callModule(app_id) {
    for (let i = 0; i < this.appid.length; i++) {
      if (app_id == this.appid[i].PRODUCT_NAME) {
        app_id = this.appid[i].PRODUCT_KEY;
        break;
      }
    }
    this.moduleid = [];
    this.api.getModule(app_id).subscribe((data: any) => {
      if (data.message == "No Record Found") {
        this.module = 0;
      }
      else {
        for (let i = 0; i < data.message.length; i++) {
          this.moduleid.push(data.message[i]);
        }
      }
    });
    setTimeout(() => {
      this.filteredModuleId = this.ModuleCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterModuleId(id) : this.moduleid.slice())
        );
    }, 1000);
  }
  test(isvalid: boolean, sform: NgForm): void {
    if (!isvalid) {
      alert('Please fill out the mandatory fields');
      this.isSubmitted = true;
    }
    else{
        this.addtoApi(sform);
    }
  }
  addtoApi(sform: NgForm): void {
    // this.refheader.RCH_MODULE_KEY=Number(this.refheader.RCH_MODULE_KEY);
    // this.refheader.RCH_PRODUCT_KEY=Number(this.refheader.RCH_PRODUCT_KEY);
    for (let i = 0; i < this.appid.length; i++) {
      if (this.product == this.appid[i].PRODUCT_NAME) {
        this.refheader.RCH_PRODUCT_KEY = this.appid[i].PRODUCT_KEY;
        break;
      }
    }
    for (let i = 0; i < this.moduleid.length; i++) {
      if (this.module == this.moduleid[i].MODULE_NAME) {
        this.refheader.RCH_MODULE_KEY = this.moduleid[i].MODULE_KEY;
        break;
      }
    }
    // if(this.refheader.RCH_MODULE_KEY==null){
    //   this.refheader.RCH_MODULE_KEY=Number(0);
    // } 
    // if(this.refheader.RCH_PRODUCT_KEY==null){
    //   this.refheader.RCH_PRODUCT_KEY=Number(0);
    // }
    if (this.refheader.RCH_HEADER_KEY == null) {
      this.api.addRefHeader(this.refheader).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status == "success") {
            sform.reset();
            this.location.back();
            this.openSnackBar('Record Inserted Successfully!!!');
            this.home.refcodesMenu();
          }
        },
        (error: RefCodesHeader) => {
          console.log(error);
          this.openSnackBar('Record Not Inserted');
        }
      );
      console.log(this.refheader);
    }
    else {
      var h=this.refheader.RCH_HEADER_KEY;
      var m=this.refheader.RCH_MODULE_KEY;
      var p=this.refheader.RCH_PRODUCT_KEY;
      var l=this.refheader.RCH_LOCK_KEY;
      var d=this.refheader.RCH_DESCRIPTION;
      var dn=this.refheader.RCH_DOMAIN_NAME;
      var t=this.refheader.RCH_DOMAIN_TYPE;
      this.api.updateRefHeader(h,m,p,l,d,dn,t).subscribe((data:any) => {
        console.log(this.refheader);
        if (data.status == "success") {
          sform.reset();
          this.location.back();
          this.openSnackBar('Record Updated Successfully!!!');
          this.home.refcodesMenu();
        }
      },
        (error: RefCodesHeader) => { console.log(error);
          this.openSnackBar('Record Not Updated'); }
      );
    }

  }
  private getRefheader(id: number) {
    if (id === 0) {
      this.refheader = {
        RCH_HEADER_KEY: null,
        RCH_DESCRIPTION: null,
        RCH_DOMAIN_NAME: null,
        RCH_DOMAIN_TYPE: null,
        RCH_LOCK_KEY: 0,
        RCH_MODULE_KEY: null,
        RCH_PRODUCT_KEY: null 
      };
      this.panelTitle = 'Add ReferenceCodes Header';
    }
    else {
      this.api.getRefHeader(id).subscribe(
        (data) => {
          this.getdata = data;
          this.refheader = this.getdata.message[0];
          for (let i = 0; i < this.appid.length; i++) {
            if (this.refheader.RCH_PRODUCT_KEY == this.appid[i].PRODUCT_KEY) {
              this.product = this.appid[i].PRODUCT_NAME;
              break;
            }
            else{
              this.product=this.refheader.RCH_PRODUCT_KEY;
            }
          }
          ////
          if(this.refheader.RCH_MODULE_KEY==0){
            this.module=0;
          }
          else{
          this.api.getModule(this.refheader.RCH_PRODUCT_KEY).subscribe((data: any) => {
            if (data.message == "No Record Found") {
                this.module=this.refheader.RCH_MODULE_KEY;
            }
            else {
              for (let i = 0; i < data.message.length; i++) {
                this.moduleid.push(data.message[i]);
              }
            }
          });
          setTimeout(() => {
            this.filteredModuleId = this.ModuleCtrl.valueChanges
              .pipe(
                startWith(''),
                map(id => id ? this._filterModuleId(id) : this.moduleid.slice())
              );
              for (let i = 0; i < this.moduleid.length; i++) {
                if (this.refheader.RCH_MODULE_KEY == this.moduleid[i].MODULE_KEY) {
                  this.module = this.moduleid[i].MODULE_NAME;
                  break;
                }
              }
          }, 1000);
        }
          ////
        });
      this.panelTitle = 'Edit ReferenceCodes Header';
    }
  }
  back() {
    this.menunameservice.nextMessage('Reference Codes');
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


