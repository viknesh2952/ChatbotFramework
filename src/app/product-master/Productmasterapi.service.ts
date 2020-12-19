import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/Product.model';
import {AppConfigService} from 'src/app/app-config.service';


@Injectable({
  providedIn: 'root'
})

export class ProductmasterApiService {
  protected dynamic=AppConfigService.settings;
  global;

  getProductdata;
  getReferenceDetail;
  addProductdata;
  updateproductdata;
  deleteproductdata;
  deployproduct;
  constructor(private http: HttpClient) { 
    this.global=this.dynamic.global;
    this.getProductdata = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'get_product';
    this.getReferenceDetail = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'get_ref_codes_list';
    this.addProductdata = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'add_product';
    this.updateproductdata = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'update_product';
    this.deleteproductdata = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'delete_product';
    this.deployproduct = this.global.DOMAIN + ':' + this.global.PORT + this.global.API_PREFIX + 'deploy_product';
  }
  getApiData() {
    return this.http.get(this.getProductdata);
  }
  getRefDetail() {
    return this.http.get(`${this.getReferenceDetail}?RCH_DOMAIN_NAME=T_TVS_CHATBOT_STORY.ACTIVE_FLAG`);
  }
  getproduct(id) {
    return this.http.get(`${this.getProductdata}?app_id=${id}`);
  }
  addproduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.addProductdata, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  updateproduct(product: ProductModel): Observable<void> {
    return this.http.post<void>(`${this.updateproductdata}`, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  deleteproduct(product_id: any): Observable<any> {
    var del_product={
      PRODUCT_KEY:product_id
    }
    return this.http.post<any>(this.deleteproductdata,del_product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  deployProduct(product_id: any, product_code: any): Observable<any> {
    return this.http.post<any>(this.deployproduct, { PRODUCT_KEY: `${product_id}`, PRODUCT_CODE: `${product_code}` }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
