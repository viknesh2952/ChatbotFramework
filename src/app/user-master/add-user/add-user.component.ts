import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute}from '@angular/router';
import { UserApiService } from 'src/app/Userapi.service';
import {UserModel} from 'src/app/models/user.model';
import {UserModel1} from 'src/app/models/user.model';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
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
//import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';


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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  //styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  date = new FormControl(moment());
  today=new Date();
  min=new Date(this.today.setDate(this.today.getDate()));
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('userform') public createuser: NgForm;
    isSubmitted:boolean=false;
    user:UserModel;
    user1:UserModel1;
    panelTitle: string;
    user_key:number=null;
    user_code:string;
    user_first_name:string;
    user_middle_name:string;
    user_last_name:string;
    user_display_name:string;
    user_password:string;
    user_address_link:string;
    user_default_profile_key:number;
    user_active_status:string;
    user_active_from="";
    user_active_to="";
    user_lock_key:number;
    user_profile_key:number;
    AppCtrl = new FormControl();
    userdata: any;
    temp1: any;
    //user_id:any;
    update:UserModel1
    app_id:number=null;
    userid:any;
    product = null;
    message:string;
    getdata: any;
    appid: AppId[]=[];
    readonly:boolean=false;
    ref= null;
    disableappid:boolean=false;
    refdetail:Refdetail[]=[];
    filteredRefDetail: Observable<Refdetail[]>;

    RefDetailCtrl = new FormControl();
    filteredAppId: Observable<AppId[]>;
    dateValid: boolean=true;
    constructor(
      private api:UserApiService,
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

        this.api.getRefDetail().subscribe((data: any) => {
          for (let i = 0; i < data.message.length; i++) {
            this.refdetail.push(data.message[i]);
            console.log(data.message[i])
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
          this.getUser(id);
        });


        this._route.queryParams.subscribe(params => {
          this.readonly = (params['mode']=='read'?true:false);
        });
        this.menunameservice.sharedMessage.subscribe(message => this.message = message);
        this.menunameservice.nextMessage(this.panelTitle);
        this.temp1=JSON.parse(sessionStorage.getItem('user'));
       this.userdata=this.temp1.message;
       this.userid=this.userdata[0].role_code;
      }
      formatDate(date){
        return this.datepipe.transform(date,global.DATE_FORMAT_OUTPUT);
      }
      test(isvalid: boolean, sform: NgForm): void {
        if(this.user_active_from==null ||this.user_active_to==null){
          alert('Please fill the form correctly');
          this.isSubmitted = true;
        }
        if((this.user_active_from != null && this.user_active_to !=null) && (this.user_active_to) < (this.user_active_from)){
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
          this.user.user_key = this.appid[i].PRODUCT_KEY;
          break;
        }
      }
      for (let i = 0; i < this.refdetail.length; i++) {
        if (this.ref == this.refdetail[i].RCD_ABBREVIATION) {
          this.user.user_active_status = this.refdetail[i].RCD_VALUE;
          break;
        }
      }

      //console.log("inside")
      if (this.user.user_key == null){
        this.api.adduser(this.user).subscribe((data:any) => {
           console.log(data);
           if (data.status == "sucess"){
            sform.reset();
            this.location.back();
            this.openSnackBar('Record Inserted Successfully!!!');
          }
        },
           //this.router.navigate(['User']);

          (error: UserModel) => { console.log(error); this.openSnackBar('Record Not Inserted'); }
        );console.log(this.user);}
        else {
          this.update = {
             user_key:this.user_key,
             user_code:this.user_code,
             user_first_name:this.user_first_name,
             user_middle_name:this.user_middle_name,
             user_last_name:this.user_last_name,
             user_display_name:this.user_display_name,
             user_password:this.user_password,
             user_address_link:this.user_address_link,
             user_default_profile_key:this.user_default_profile_key,
             user_active_status:this.user_active_status,
             user_active_from:this.user_active_from,
             user_active_to:this.user_active_to,
             user_lock_key:this.user_lock_key,
             user_profile_key:this.user_profile_key
          };
          this.api.updateuser(this.update).subscribe((data:any) => {
            console.log(this.update);
            sform.reset();
            this.location.back();
            this.openSnackBar('Record Updated Successfully!!!');

          },
            (error: UserModel1) => { console.log(error);
              this.openSnackBar('Record Not Updated'); }
          );

        }


      }
      private getUser(id: number) {
        try{
          if (id === 0) {
          this.user = {
            //user_id:null,
            user_key:null,
            user_code:null,
            user_first_name:null,
            user_middle_name:null,
            user_last_name:null,
            user_display_name:null,
            user_password:null,
            user_address_link:null,
            user_default_profile_key:null,
            user_active_status:'W',
            user_active_from:null,
            user_active_to:null,
            user_lock_key:1001,
            user_profile_key:2006,
          };

          if (this.app_id){
            this.user.user_key=this.app_id
            this.disableappid=true;
          }
          this.panelTitle = 'Add User';
        }
        else {
          this.api.getUser(id).subscribe(
            (user:any) => {
              this.user = user.message[0];
              console.log(this.user)
          },
            (err: UserModel) => console.log(err)
          );
          this.panelTitle = 'Edit user';
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

