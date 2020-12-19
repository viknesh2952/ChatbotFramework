import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute}from '@angular/router';
import { ProgramMasterApiService } from 'src/app/program-master/program-master-api.service';
import {ProgramModel, ProgramModelUpdate} from 'src/app/models/program.model';
//import {UserModel1} from 'src/app/models/user.model';
import { MenunameService } from 'src/app/menuname.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import * as global from 'src/config';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';


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
  selector: 'app-addprogram',
  templateUrl: './addprogram.component.html',
  styleUrls: ['./addprogram.component.css']
})
export class AddprogramComponent implements OnInit {
  date = new FormControl(moment());
  today=new Date();
  min=new Date(this.today.setDate(this.today.getDate()));
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('programform') public createprogram: NgForm;
  isSubmitted:boolean=false;
  program:ProgramModel;
  programupdate:ProgramModelUpdate;
  panelTitle: string;
  product = null;

  program_key:number=null;
  program_parent_key:number;
  program_type:string;
  program_code:string;
  program_description:string;
  program_page_name:string;
  program_page_path:string;
  program_icon_path:string;
  program_access_control:string;
  program_order:string;
  program_active_status:string;
  program_active_from:"";
  program_active_to:"";
  program_lock_key:number;
  program_profile_key:number;

  AppCtrl = new FormControl();
  userdata: any;
  temp1: any;
  update:ProgramModelUpdate;
  app_id:number=null;
  userid:any;
  message:string;
  getdata: any;
  appid: AppId[]=[];
  readonly:boolean=false;
  ref=null;
  disableappid:boolean=false;
  refdetail:Refdetail[]=[];
  filteredRefDetail: Observable<Refdetail[]>;

  dateValid: boolean=true;
  RefDetailCtrl = new FormControl();
  filteredAppId: Observable<AppId[]>;

  constructor(
    private api:ProgramMasterApiService,
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
      if(this.program_active_from==null ||this.program_active_to==null){
        alert('Please fill the form correctly');
        this.isSubmitted = true;
      }
      if((this.program_active_from != null && this.program_active_to !=null) && (this.program_active_to) < (this.program_active_from)){
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
        this.program.program_key = this.appid[i].PRODUCT_KEY;
        break;
      }
    }
    for (let i = 0; i < this.refdetail.length; i++) {
      if (this.ref == this.refdetail[i].RCD_ABBREVIATION) {
        this.program.program_active_status = this.refdetail[i].RCD_VALUE;
        break;
      }
    }

      //console.log("inside")
      if (this.program.program_key == null){
        this.api.addprogram(this.program).subscribe((data:any) => {
           console.log(data);
           sform.reset();
           this.location.back();
           this.openSnackBar('Record Inserted Successfully!!!');
           this.router.navigate(['Program']);
          },
          (error: ProgramModel) => { console.log(error);  this.openSnackBar('Record Not Inserted');  }
        );}
        else{
          this.api.updateprogram(this.program).subscribe((data:any) => {
            console.log(this.program);
            if (data.status == "success") {
              sform.reset();
              this.location.back();
              this.router.navigate(['Role']);
              this.openSnackBar('Record Updated Successfully!!!');

            }
          },
            (error: ProgramModel) => { console.log(error);
              this.openSnackBar('Record Not Updated'); }
          );
        }

      }

      private getprogram(id: number) {
        try{
          if (id === 0) {
          this.program = {
            //user_id:null,
            program_key:null,
            program_parent_key:1234,
            program_type:null,
            program_code:null,
            program_description:null,
            program_page_name:null,
            program_page_path:null,
            program_icon_path:null,
            program_access_control:null,
            program_order:null,
            program_active_status:'W',
            program_active_from:null,
            program_active_to:null,
            program_lock_key:1001,
            program_profile_key:2006,
          };

          if (this.app_id){
            this.program.program_key=this.app_id
            this.disableappid=true;
          }
          this.panelTitle = 'Add Program';
        }
        else {
          this.api.getprogram(id).subscribe(
            (data) => {
              this.getdata = data;
              this.program = this.getdata.message[0];
              console.log(this.program);
              this.ref = this.program.role_active_status;
              // this.role_active_from=new Date(this.role.MODGRP_ACTIVE_FROM);
              // this.role_active_to=new Date(this.role.MODGRP_ACTIVE_TO);
              for (let i = 0; i < this.appid.length; i++) {
                if (this.program.program_key == this.appid[i].PRODUCT_KEY) {
                  this.product = this.appid[i].PRODUCT_NAME;
                  break;
                }
              }
            });
            this.panelTitle = 'Edit Program';
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
