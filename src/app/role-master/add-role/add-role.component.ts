import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute}from '@angular/router';
import { RolemasterApiService } from 'src/app/Rolemasterapi.service';
import {RoleModel, RoleModel1} from 'src/app/models/role.model';
import { MenunameService } from 'src/app/menuname.service';
import { Location } from '@angular/common';
import {DatePipe} from '@angular/common';
import * as global from 'src/config';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
//import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
const moment = _rollupMoment || _moment;


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
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  //styleUrls: ['./add-role.component.scss']
})
export class addroleComponent implements OnInit {
  date = new FormControl(moment());
  today=new Date();
  min=new Date(this.today.setDate(this.today.getDate()));
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('roleform') public createrole: NgForm;
    isSubmitted:boolean=false;
    loginForm: FormGroup;
    role:RoleModel;
    panelTitle: string;
    role_key:number;
    role_code:number;
    role_description:string;
    //role_active_status:null,
    role_active_from:"";
    role_active_to:"";
    role_lock_key:number;
    role_profile_key:number;
    readonly: boolean = false;
    message: string;
    temp1: any;
    userdata: any;
    user_id: any;
    userid:any;
    app_id:number=null;
    disableappid:boolean=false;
    update:RoleModel1;
    id: number;
    Displayname: string;
    getdata: any;
    product = null;
    ref= null;
    filteredAppId: Observable<AppId[]>;
    AppCtrl = new FormControl();
    appid: AppId[]=[];
    refdetail:Refdetail[]=[];
    RefDetailCtrl = new FormControl();
    filteredRefDetail: Observable<Refdetail[]>;
    dateValid: boolean=true;

    constructor(
      private api:RolemasterApiService,
      private router:Router,
      private menunameservice: MenunameService,
      private _route:ActivatedRoute,
      private location: Location,
      private datepipe:DatePipe,
      private fb: FormBuilder,
      private snackBar: MatSnackBar)

    {
      this.api.getProduct().subscribe((data:any) => {
        for(let i=0;i<data.message.length;i++){
            this.appid.push(data.message[i]);
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
        this.getRole(id);
      });
      this._route.queryParams.subscribe(params => {
        this.readonly = (params['mode']=='read'?true:false);
      });
      this.menunameservice.sharedMessage.subscribe(message => this.message = message);
      this.menunameservice.nextMessage(this.panelTitle);
      this.temp1=JSON.parse(sessionStorage.getItem('role'));
      this.userdata=this.temp1.message;
      this.userid=this.userdata[0].role_code;
    }


      formatDate(date){
        return this.datepipe.transform(date,global.DATE_FORMAT_OUTPUT);
      }

      test(isvalid: boolean, sform: NgForm): void {
        if(this.role_active_from==null ||this.role_active_to==null){
         // alert('Please fill the form correctly');
          this.isSubmitted = true;
        }
        if((this.role_active_from != null && this.role_active_to !=null) && (this.role_active_to) < (this.role_active_from)){
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
          this.role.role_key = this.appid[i].PRODUCT_KEY;
          break;
        }
      }
      for (let i = 0; i < this.refdetail.length; i++) {
        if (this.ref == this.refdetail[i].RCD_ABBREVIATION) {
          this.role.role_active_status = this.refdetail[i].RCD_VALUE;
          break;
        }
      }
       if (this.role.role_key == null){
          this.api.addrole(this.role).subscribe((data:any) => {
            console.log(data);
            sform.reset();
            this.location.back();
            this.router.navigate(['Role']);
            this.openSnackBar('Record Inserted Successfully!!!');
          },
          (error: RoleModel) => { console.log(error);  this.openSnackBar('Record Not Inserted');  }
        );}
        else {
          this.api.updaterole(this.role).subscribe((data:any) => {
            console.log(this.role);
            if (data.status == "success") {
              sform.reset();
              this.location.back();
              this.router.navigate(['Role']);
              this.openSnackBar('Record Updated Successfully!!!');

            }
          },
            (error: RoleModel1) => { console.log(error);
              this.openSnackBar('Record Not Updated'); }
          );
        }
      }

      private getRole(id: number) {
          if (id === 0 ) {
          this.role = {
              role_key:null,
              role_code:null,
              role_description:null,
              role_active_status:'W',
              role_active_from:null,
              role_active_to:null,
              role_lock_key:1004,
              role_profile_key:1001
          };

          if (this.app_id){
            this.role.role_key=this.app_id
            this.disableappid=true;
          }
          this.panelTitle = 'Add role';
        }
        else {
          this.api.getRole(id).subscribe(
            (data) => {
              this.getdata = data;
              this.role = this.getdata.message[0];
              console.log(this.role);
              this.ref = this.role.role_active_status;
              // this.role_active_from=new Date(this.role.MODGRP_ACTIVE_FROM);
              // this.role_active_to=new Date(this.role.MODGRP_ACTIVE_TO);
              for (let i = 0; i < this.appid.length; i++) {
                if (this.role.role_key == this.appid[i].PRODUCT_KEY) {
                  this.product = this.appid[i].PRODUCT_NAME;
                  break;
                }
              }
            });
          this.panelTitle = 'Edit role';
        }
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

