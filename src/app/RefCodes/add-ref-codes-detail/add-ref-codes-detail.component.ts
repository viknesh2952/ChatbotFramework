import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RefcodesApiService } from '../refcodes-api.service';
import { MenunameService } from 'src/app/menuname.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { RefCodesDetail } from 'src/app/models/refcodes.model';

@Component({
  selector: 'app-add-ref-codes-detail',
  templateUrl: './add-ref-codes-detail.component.html',
  styleUrls: ['./add-ref-codes-detail.component.css']
})
export class AddRefCodesDetailComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('refdetailform') public createrefdetail: NgForm;
  isSubmitted: boolean = false;
  refdetail: RefCodesDetail;
  panelTitle: string = 'Add ReferenceCodes Detail';
  message: string;
  readonly: boolean;
  getdata: any;
  default_list = [
    { value: 'Y', viewValue: 'Yes' },
    { value: 'N', viewValue: 'No' }
  ];
  constructor(
    private api: RefcodesApiService,
    private menunameservice: MenunameService,
    private router: Router,
    private _route: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar) {
      this.menunameservice.routeAuth('/RefCodes');
  }
  ngOnInit(): void {    
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      const header = +parameterMap.get('header');
      this.getRefdetail(header,id);
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
    else{
      this.addtoApi(sform);
    }     
  }
  addtoApi(sform: NgForm): void {
    // this.refheader.RCH_MODULE_KEY=Number(this.refheader.RCH_MODULE_KEY);
    // this.refheader.RCH_PRODUCT_KEY=Number(this.refheader.RCH_PRODUCT_KEY);
    // if(this.refheader.RCH_MODULE_KEY==null){
    //   this.refheader.RCH_MODULE_KEY=Number(0);
    // }
    // if(this.refheader.RCH_PRODUCT_KEY==null){
    //   this.refheader.RCH_PRODUCT_KEY=Number(0);
    // }
    // if(this.refheader.RCH_LOCK_KEY==null){
    //   this.refheader.RCH_LOCK_KEY=Number(0);
    // }
    if (this.refdetail.RCD_DETAIL_KEY == null) {
      this.api.addRefDetail(this.refdetail).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status == "success") {
            sform.reset();
            this.location.back();
            this.openSnackBar('Record Inserted Successfully!!!');
          }
        },
        (error: RefCodesDetail) => {
          console.log(error);
          this.openSnackBar('Record Not Inserted');
        }
      );
      console.log(this.refdetail);
    }
    else {
      // console.log(this.refheader.RCH_MODULE_KEY);
      // console.log(this.refheader.RCH_PRODUCT_KEY);
      // console.log(this.refheader);
      this.api.updateRefDetail(this.refdetail).subscribe((data:any) => {
        console.log(this.refdetail);
        if (data.status == "success") {
          sform.reset();
          this.location.back();
          this.openSnackBar('Record Updated Successfully!!!');
        }
      },
        (error: RefCodesDetail) => { console.log(error);
          this.openSnackBar('Record Not Updated'); }
      );
    }

  }
  private getRefdetail(header:number,id: number) {
    if (id === 0) {
      this.refdetail = {
        RCD_ABBREVIATION:null,
        RCD_DETAIL_KEY:null,
        RCD_HEADER_KEY:header,
        RCD_HIGH_RANGE:null,
        RCD_LOCK_KEY:0,
        RCD_LOW_RANGE:null,
        RCD_MEANING:null,
        RCD_ORDER_BY:null,
        RCD_SET_AS_DEFAULT:null,
        RCD_VALUE:null
      };
      this.panelTitle = 'Add ReferenceCodes Detail';
    }
    else {
      this.api.getDetaildata(header,id).subscribe(
        (data) => {
          this.getdata = data;
          this.refdetail = this.getdata.message[0];
        });
      this.panelTitle = 'Edit ReferenceCodes Detail';
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


