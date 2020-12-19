import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SubModuleapiService } from 'src/app/sub-module-master/sub-moduleapi.service';
import { SubModuleModel, SubModuleModelUpdate } from 'src/app/models/sub-module.model';
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
      templateUrl: './addsub-module.component.html',
      styleUrls: ['./addsub-module.component.css']
    })
export class AddsubModuleComponent implements OnInit {
  date = new FormControl(moment());
  today=new Date();
  min=new Date(this.today.setDate(this.today.getDate()));
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('submoduleform') public createprogram: NgForm;
  isSubmitted:boolean=false;
  submodule:SubModuleModel;
  programupdate:SubModuleModelUpdate;
  panelTitle: string;

  SUB_MODULE_KEY: number = null;
  SUB_MODULE_PARENT_KEY: number;
  SUB_MODULE_CODE: string;
  SUB_MODULE_NAME: string;
  SUB_MODULE_ACTIVE_FLAG: string;
  SUB_MODULE_ORDER_BY: number;
  SUB_MODULE_PAGE: string;
  SUB_MODULE_PATH: string;
  SUB_MODULE_ICON: string;
  SUB_MODULE_PASSWORD_REQUIRED: string;
  SUB_MODULE_PREFIX: string;
  SUB_MODULE_ACTIVE_FROM: string;
  SUB_MODULE_ACTIVE_TO: string;
  SUB_MODULE_LOCK_KEY: number;
  SUB_MODULE_PRODUCT_KEY: number;
  SUB_APPLICABILITY: string;
  ref= null;
  AppCtrl = new FormControl();
  userdata: any;
  temp1: any;
  update: SubModuleModelUpdate;
  app_id: number = null;
  userid: any;
  message: string;
  getdata: any;
  appid: AppId[] = [];
  readonly: boolean = false;
  product=null;
  disableappid: boolean = false;
  refdetail: Refdetail[] = [];
  filteredRefDetail: Observable<Refdetail[]>;

  dateValid: boolean=true;
  RefDetailCtrl = new FormControl();
  filteredAppId: Observable<AppId[]>;




  constructor(
    private api:SubModuleapiService,
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
          }
        }
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
        this.getSubmodule(id);
      });


      this._route.queryParams.subscribe(params => {
        this.readonly = (params['mode']=='read'?true:false);
      });
      this.menunameservice.sharedMessage.subscribe(message => this.message = message);
      this.menunameservice.nextMessage(this.panelTitle);
      this.temp1=JSON.parse(sessionStorage.getItem('getSubmodule'));
      this.userdata=this.temp1.message;
      this.userid=this.userdata[0].program_code;
    }
    formatDate(date){
      return this.datepipe.transform(date,global.DATE_FORMAT_OUTPUT);
    }
    test(isvalid: boolean, sform: NgForm): void {
      if(this.SUB_MODULE_ACTIVE_FROM==null ||this.SUB_MODULE_ACTIVE_TO==null){
        //alert('Please fill the form correctly');
        this.isSubmitted = true;
      }
      if((this.SUB_MODULE_ACTIVE_FROM != null && this.SUB_MODULE_ACTIVE_TO !=null) && (this.SUB_MODULE_ACTIVE_TO) < (this.SUB_MODULE_ACTIVE_FROM)){
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
          this.submodule.user_key = this.appid[i].PRODUCT_KEY;
          break;
        }
      }
      for (let i = 0; i < this.refdetail.length; i++) {
        if (this.ref == this.refdetail[i].RCD_ABBREVIATION) {
          this.submodule.user_active_status = this.refdetail[i].RCD_VALUE;
          break;
        }
      }
      //console.log("inside")
      if (this.submodule.SUB_MODULE_KEY == null) {
            this.api.addSubmodule(this.submodule).subscribe((data: any) => {
                  console.log(data);
                  sform.reset();
                  this.location.back();
                  this.openSnackBar('Record Inserted Successfully!!!');
                  this.router.navigate(['getSubmodule']);
                },
                  (error: SubModuleModel) => { console.log(error); }
                );
              }
        else {
          this.api.updateSubmodule(this.submodule).subscribe((data:any) => {
            console.log(this.submodule);
            if (data.status == "success") {
              sform.reset();
              this.location.back();
              this.openSnackBar('Record Updated Successfully!!!');
            }
          },
            (error: SubModuleModel) => { console.log(error);
              this.openSnackBar('Record Not Updated'); }
          );
        }

      }

      private getSubmodule(id: number) {
        try{
          if (id === 0) {
          this.submodule = {
            //user_id:null,
            SUB_MODULE_KEY: null,
            SUB_MODULE_PARENT_KEY: 1234,
            SUB_MODULE_CODE: null,
            SUB_MODULE_NAME: null,
            SUB_MODULE_ACTIVE_FLAG:'w',
            SUB_MODULE_ORDER_BY: null,
            SUB_MODULE_PAGE: null,
            SUB_MODULE_PATH: null,
            SUB_MODULE_ICON: null,
            SUB_MODULE_PASSWORD_REQUIRED: null,
            SUB_MODULE_PREFIX: null,
            SUB_MODULE_ACTIVE_FROM: null,
            SUB_MODULE_ACTIVE_TO: null,
            SUB_MODULE_LOCK_KEY: 1002,
            SUB_MODULE_PRODUCT_KEY: 1002,
            SUB_APPLICABILITY: null,
          };

          if (this.app_id){
            this.submodule.SUB_MODULE_KEY=this.app_id
            this.disableappid=true;
          }
          this.panelTitle = ' Add Module ';
        }
        else{
            this.api.getSubmodule(id).subscribe(
              (submodule:any) => {
                this.submodule = submodule.message[0];
                console.log(this.submodule)
              },
              (err: SubModuleModel) => console.log(err)
            );
            this.panelTitle = ' Edit Sub Module ';
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

