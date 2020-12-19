import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductmasterApiService } from '../Productmasterapi.service';
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
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { ProductModel } from 'src/app/models/Product.model';



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
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {
  date = new FormControl(moment());
  today = new Date();
  min = new Date(this.today.setDate(this.today.getDate()-1));
  // min1=new Date(this.today.setDate(this.today.getDate() + 1));
  dateValid: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('productform') public createproduct: NgForm;
  isSubmitted: boolean = false;
  product: ProductModel;
  panelTitle: string = 'Add Product';
  disableappid: boolean = false;
  message: string;
  readonly: boolean;
  refdetail: Refdetail[] = [];
  ref = null;
  RefDetailCtrl = new FormControl();
  filteredRefDetail: Observable<Refdetail[]>;
  getdata: any;
  PRODUCT_ACTIVE_FROM;
  PRODUCT_ACTIVE_TO;
  protected dynamic = AppConfigService.settings;
  global;
  productdata: any;
  id: number;
  dateString: any;
  fromvalid: boolean = false;
  tovalid: boolean = false;
  from_past: boolean = false;
  to_past: boolean = false;

  constructor(
    private api: ProductmasterApiService,
    private menunameservice: MenunameService,
    private router: Router,
    private _route: ActivatedRoute,
    private location: Location,
    private datepipe: DatePipe,
    private snackBar: MatSnackBar) {
    this.global = this.dynamic.global;
    this.menunameservice.routeAuth('/Product');
    this.api.getRefDetail().subscribe((data: any) => {
      for (let i = 0; i < data.message.length; i++) {
        this.refdetail.push(data.message[i]);
        if (data.message[i].RCD_SET_AS_DEFAULT == 'Y') {
          this.ref = data.message[i].RCD_ABBREVIATION;
        }
      }
    });
  }
  private _filterRefDetail(value: any): Refdetail[] {
    const filterValue = value;
    return this.refdetail.filter(id => id.RCD_ABBREVIATION.toLowerCase().indexOf(filterValue) === 0);
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.filteredRefDetail = this.RefDetailCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterRefDetail(id) : this.refdetail.slice())
        );
    }, 2000);
    this._route.paramMap.subscribe(parameterMap => {
      this.id = +parameterMap.get('id');
      this.getProduct(this.id);
    });
    this._route.queryParams.subscribe(params => {
      this.readonly = (params['mode'] == 'read' ? true : false);
    });
    this.menunameservice.sharedMessage.subscribe(message => this.message = message);
    this.menunameservice.nextMessage(this.panelTitle);
    this.productdata = this.menunameservice.getProductList();
  }
  formatDate(date) {
    return this.datepipe.transform(date, this.global.DATE_FORMAT_OUTPUT);
  }
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
  chkpastcall(p:number){
    if(this.from_past && p==1){
      this.chkpastDate(1);
      return true;
    }
    if(this.to_past && p==2){
      this.chkpastDate(2);
      return true;
    }
  }
  chkpastDate(p: number) {
    if(this.id==0){
      console.log(this.PRODUCT_ACTIVE_FROM+'from');
      console.log(this.min+'today');
      console.log((this.PRODUCT_ACTIVE_FROM < this.min)+'from < today');
    if (p == 1) {
      if (this.PRODUCT_ACTIVE_FROM < this.min) {
        this.from_past = true;
      }
      else {
        this.from_past = false;
      }
    }
    else {
      if (this.PRODUCT_ACTIVE_TO < this.min) {
        this.to_past = true;
      }
      else {
        this.to_past = false;
      }
    }
  }
}
  chkExistingProduct(product_code) {
    for (let i = 0; i < this.productdata.length; i++) {
      if (this.id == 0 && product_code == this.productdata[i].PRODUCT_CODE) {
        if (this.productdata[i].PRODUCT_ACTIVE_FLAG == 'N') {
          return false;
        }
        return true;
      }
      if (this.id != 0 && product_code == this.productdata[i].PRODUCT_CODE) {
        if (this.id == this.productdata[i].PRODUCT_KEY || this.productdata[i].PRODUCT_ACTIVE_FLAG == 'N') {
          return false;
        }
        return true;
      }
    }
    return false;
  }
  activeTo() {
    if (this.PRODUCT_ACTIVE_FROM == null || this.PRODUCT_ACTIVE_TO == null) {
      console.log('Date is Null');
      return false;
    }
    if ((this.PRODUCT_ACTIVE_FROM._d != null && this.PRODUCT_ACTIVE_TO._d != null) && (this.PRODUCT_ACTIVE_TO._d) < (this.PRODUCT_ACTIVE_FROM._d)) {
      this.dateValid = false;
      return false;
    }
    else {
      this.dateValid = true;
      return true;
    }
  }
  test(isvalid: boolean, sform: NgForm) {
    if (this.PRODUCT_ACTIVE_FROM == null || this.PRODUCT_ACTIVE_TO == null) {
      alert('Date is empty or Invalid');
      this.isSubmitted = true;
    }
    if ((this.PRODUCT_ACTIVE_FROM._d != null && this.PRODUCT_ACTIVE_TO._d != null) && (this.PRODUCT_ACTIVE_TO._d) < (this.PRODUCT_ACTIVE_FROM._d)) {
      this.dateValid = false;
    }
    else {
      this.dateValid = true;
    } 
    if (!this.fromvalid) {
      this.isValidDate(this.PRODUCT_ACTIVE_FROM, 1);
    }
    else {
      this.chkpastDate(1);
    }
    if (!this.tovalid) {
      this.isValidDate(this.PRODUCT_ACTIVE_TO, 2);
    }
    else {
      this.chkpastDate(2);
    }
    if (!isvalid) {
      alert('Please fill out the mandatory fields');
      this.isSubmitted = true;
    }
    else if (this.chkExistingProduct(this.product.PRODUCT_CODE)) {
      alert('Product Code Should be Different');
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

    for (let i = 0; i < this.refdetail.length; i++) {
      if (this.ref == this.refdetail[i].RCD_ABBREVIATION) {
        this.product.PRODUCT_ACTIVE_FLAG = this.refdetail[i].RCD_VALUE;
        break;
      }
    }
    this.product.PRODUCT_ACTIVE_FROM = this.formatDate(this.PRODUCT_ACTIVE_FROM);
    this.product.PRODUCT_ACTIVE_TO = this.formatDate(this.PRODUCT_ACTIVE_TO);
    console.log(this.product);
    if (this.product.PRODUCT_KEY == null) {
      this.api.addproduct(this.product).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status == "success") {
            sform.reset();
            this.location.back();
            this.openSnackBar('Record Inserted Successfully!!!');
          }
        },
        (error: ProductModel) => {
          console.log(error);
          this.openSnackBar('Record Not Inserted');
        }
      );
      console.log(this.product);
    }
    else {
      this.api.updateproduct(this.product).subscribe((data: any) => {
        console.log(this.product);
        if (data.status == "success") {
          sform.reset();
          this.location.back();
          this.openSnackBar('Record Updated Successfully!!!');
        }
      },
        (error: ProductModel) => {
          console.log(error);
          this.openSnackBar('Record Not Updated');
        }
      );
    }

  }
  private getProduct(id: number) {
    if (id === 0) {
      this.product = {
        PRODUCT_ACTIVE_FLAG: null,
        PRODUCT_ACTIVE_FROM: null,
        PRODUCT_ACTIVE_TO: null,
        PRODUCT_CODE: null,
        PRODUCT_KEY: null,
        PRODUCT_LOCK_KEY: 0,
        PRODUCT_NAME: null,
        PRODUCT_PURPOSE:null,
        PRODUCT_ORDER_BY: null,
        PRODUCT_DEPLOYED_URL: null
      };
      this.panelTitle = 'Add product';
    }
    else {
      this.api.getproduct(id).subscribe(
        (data) => {
          this.getdata = data;
          this.product = this.getdata.message[0];
          console.log(this.product);
          this.ref = this.product.PRODUCT_ACTIVE_FLAG;
          /////////////////
          this.PRODUCT_ACTIVE_FROM = new Date(this.product.PRODUCT_ACTIVE_FROM);
          this.PRODUCT_ACTIVE_TO = new Date(this.product.PRODUCT_ACTIVE_TO);
          if (this.product.PRODUCT_LOCK_KEY == null) {
            this.product.PRODUCT_LOCK_KEY = 0;
          }
          ////////
        });
      this.panelTitle = 'Edit product';
    }
    setTimeout(() => {
      for (let i = 0; i < this.refdetail.length; i++) {
        if (this.product.PRODUCT_ACTIVE_FLAG == this.refdetail[i].RCD_VALUE) {
          this.ref = this.refdetail[i].RCD_ABBREVIATION;
          break;
        }
      }
    }, 800)

  }
  /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
  back() {
    this.location.back();
    this.menunameservice.nextMessage('Product Master');
  }
  openSnackBar(msg) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}    
