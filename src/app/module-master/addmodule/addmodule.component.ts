import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulemasterapiService } from 'src/app/module-master/modulemasterapi.service';
import { ModuleModel, ModuleModelUpdate } from 'src/app/models/module.model';
import { MenunameService } from 'src/app/menuname.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import * as global from 'src/config';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Validators } from '@angular/forms';


const moment = _rollupMoment || _moment;



export interface AppId {
  PRODUCT_CODE: string,
  PRODUCT_KEY: number,
  PRODUCT_NAME: string
  PRODUCT_ACTIVE_FLAG: string,
  PRODUCT_ACTIVE_FROM: string,
  PRODUCT_ACTIVE_TO: string,
  PRODUCT_LOCK_KEY: number,
  PRODUCT_ORDER_BY: number
}
export interface Refdetail{
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

@Component({
      selector: 'app-addmodule',
      templateUrl: './addmodule.component.html',
      styleUrls: ['./addmodule.component.css']
    })
export class AddmoduleComponent implements OnInit {
  date = new FormControl(moment());
  today=new Date();
  min=new Date(this.today.setDate(this.today.getDate()));
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('moduleform') public createprogram: NgForm;
  isSubmitted:boolean=false;
  module:ModuleModel;
  programupdate:ModuleModelUpdate;
  panelTitle: string;

  MODULE_KEY: number = null;
  MODULE_PARENT_KEY: number;
  MODULE_CODE: string;
  MODULE_NAME: string;
  MODULE_ACTIVE_FLAG: string;
  MODULE_ORDER_BY: number;
  MODULE_PAGE: string;
  MODULE_PATH: string;
  MODULE_ICON: string;
  MODULE_PASSWORD_REQUIRED: string;
  MODULE_PREFIX: string;
  MODULE_ACTIVE_FROM;
  MODULE_ACTIVE_TO;
  MODULE_LOCK_KEY: number;
  MODULE_PRODUCT_KEY: number;
  MODULE_APPLICABILITY: string;
  product = null;

  AppCtrl = new FormControl();
  userdata: any;
  temp1: any;
  update: ModuleModelUpdate;
  app_id: number = null;
  userid: any;
  message: string;
  getdata: any;
  appid: AppId[] = [];
  readonly: boolean = false;
  ref= null;
  disableappid: boolean = false;
  refdetail: Refdetail[] = [];
  filteredRefDetail: Observable<Refdetail[]>;

  dateValid: boolean=true;

  RefDetailCtrl = new FormControl();
  filteredAppId: Observable<AppId[]>;

  SubModuleCtrl = new FormControl();


  constructor(
    private api:ModulemasterapiService,
    private menunameservice:MenunameService,
    private router: Router,
    private _route: ActivatedRoute,
    private location: Location,
    private datepipe:DatePipe,
    private snackBar: MatSnackBar)
    {
      this.api.getProduct().subscribe((data:any) => {
        for(let i=0;i<data.message.length;i++){
          if(data.message[i].PRODUCT_ACTIVE_FLAG=='Y'){
            this.appid.push(data.message[i]);
          }}
      });

      this.api.getRefDetail().subscribe((data:any) => {
      for(let i=0;i<data.message.length;i++){
        this.refdetail.push(data.message[i]);
        if(data.message[i].RCD_SET_AS_DEFAULT=='Y')
        {
          this.ref=data.message[i].RCD_ABBREVIATION;
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
      setTimeout(()=>
      {
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
      },2000);

      this._route.paramMap.subscribe(parameterMap => {
        const id = +parameterMap.get('id');
        this.app_id = +parameterMap.get('appid');
        this.getprogram(id);
      });


      this._route.queryParams.subscribe(params => {
        this.readonly = (params['mode']=='read'?true:false);
      });
      this.menunameservice.sharedMessage.subscribe(message => this.message = message);
      this.menunameservice.nextMessage(this.panelTitle);
      this.temp1=JSON.parse(sessionStorage.getItem('program'));
      this.userdata=this.temp1.message;
      this.userid=this.userdata[0].program_code;
    }
    formatDate(date){
      return this.datepipe.transform(date,global.DATE_FORMAT_OUTPUT);
    }
    test(isvalid: boolean, sform: NgForm): void {
      if(this.MODULE_ACTIVE_FROM==null ||this.MODULE_ACTIVE_TO==null){
       // alert('Please fill the form correctly');
        this.isSubmitted = true;
      }
      if((this.MODULE_ACTIVE_FROM != null && this.MODULE_ACTIVE_TO !=null) && (this.MODULE_ACTIVE_TO) < (this.MODULE_ACTIVE_FROM)){
            this.dateValid = false;
          }
          else{
            this.dateValid=true;
          }
      if (!isvalid) {
        alert('Please fill the form correctly');
        this.isSubmitted = true;
      }
      else {
        if(this.dateValid){
          this.addtoApi(sform);
        }
        else{
          alert('Invalid Date');
        }
      }
    }
    addtoApi(sform:NgForm):void{
      for (let i = 0; i < this.appid.length; i++) {
        if (this.product == this.appid[i].PRODUCT_NAME) {
          this.module.MODULE_KEY = this.appid[i].PRODUCT_KEY;
          break;
        }
      }
      for (let i = 0; i < this.refdetail.length; i++) {
        if (this.ref == this.refdetail[i].RCD_ABBREVIATION) {
          this.module.MODULE_ACTIVE_FLAG = this.refdetail[i].RCD_VALUE;
          break;
        }
      }

      //console.log("inside")
      if (this.module.MODULE_KEY == null) {
            this.api.addModule(this.module).subscribe((data: any) => {
                  console.log(data);
                  sform.reset();
                  this.location.back();
                  this.openSnackBar('Record Inserted Successfully!!!');
                  this.router.navigate(['Program']);
                },
                  (error: ModuleModel) => { console.log(error); this.openSnackBar('Record Not Inserted'); }
                );
              }
        else{
          this.api.updateModule(this.module).subscribe((data:any) => {
            console.log(this.module);
            if (data.status == "success") {
              sform.reset();
              this.location.back();
              this.openSnackBar('Record Updated Successfully!!!');
            }
          },
            (error: ModuleModel) => { console.log(error);
              this.openSnackBar('Record Not Updated'); }
          );
        }

      }

      private getprogram(id: number) {
        try{
          if (id === 0) {
          this.module = {
            //user_id:null,
            MODULE_KEY: null,
            MODULE_PARENT_KEY: 0,
            MODULE_CODE: null,
            MODULE_NAME: null,
            MODULE_ACTIVE_FLAG:null,
            MODULE_ORDER_BY: null,
            MODULE_PAGE: null,
            MODULE_PATH: null,
            MODULE_ICON: null,
            MODULE_PASSWORD_REQUIRED: null,
            MODULE_PREFIX: null,
            MODULE_ACTIVE_FROM: null,
            MODULE_ACTIVE_TO: null,
            MODULE_LOCK_KEY: 0,
            MODULE_PRODUCT_KEY: 0,
            MODULE_APPLICABILITY: null,
          };

          if (this.app_id){
            this.module.MODULE_KEY=this.app_id
            this.disableappid=true;
          }
          this.panelTitle = 'Add Module';
        }
        else{
            this.api.getModule(id).subscribe(
              (data) => {
                this.getdata=data;
                this.module = this.getdata.message[0];
                console.log(this.module)
                this.ref = this.module.MODGRP_ACTIVE_FLAG;
                this.MODULE_ACTIVE_FROM = new Date(this.module.MODGRP_ACTIVE_FROM);
                this.MODULE_ACTIVE_TO = new Date(this.module.MODGRP_ACTIVE_TO);
                for (let i = 0; i < this.appid.length; i++) {
                  if (this.module.MODULE_PRODUCT_KEY == this.appid[i].PRODUCT_KEY) {
                    this.product = this.appid[i].PRODUCT_NAME;
                    break;
                  }
                }
              },
              (err: ModuleModel) => console.log(err)
            );
            this.panelTitle = 'Edit Module';
          }
      }
      catch(e){}
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

