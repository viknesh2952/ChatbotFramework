import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductmasterApiService } from '../product-master/Productmasterapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/Product.model';
import { AgGridAngular } from 'ag-grid-angular';
import {AppConfigService} from 'src/app/app-config.service';
import { DatePipe } from '@angular/common';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenunameService } from 'src/app/menuname.service';
@Component({
  selector: 'app-product-approval',
  templateUrl: './product-approval.component.html'
})
export class ProductApprovalComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  gridOptions = {
    columnDefs: 'columnDefs',
    rowData: 'rowData',
    rowSelection: 'multiple',
    defaultColDef: 'defaultColDef',
    colResizeDefault: 'colResizeDefault',
    getRowStyle: 'getRowStyle'
  };
  public modules: any[] = [
    ClientSideRowModelModule,
    SetFilterModule,
    MenuModule,
    ColumnsToolPanelModule,
  ];
  defaultColDef: { resizable: boolean; filter:string;floatingFilter:boolean;};
  rowData: ProductModel;
  temp: any;
  selectedDataStringPresentation;
  colResizeDefault: string;
  protected dynamic=AppConfigService.settings;
  global;
  selectedId: number;
  product:ProductModel;
  selectedRows: any[]=[];
  constructor(private http: HttpClient,
    private Productapi: ProductmasterApiService,
    private menunameservice:MenunameService,
    private router: Router,
    private _route: ActivatedRoute,
    private datepipe: DatePipe,
    private snackBar: MatSnackBar) {
    this.global=this.dynamic.global;
    this.menunameservice.routeAuth(this.router.url);
    this.colResizeDefault = 'shift';
    this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
    this.product={
         PRODUCT_ACTIVE_FLAG:null,
         PRODUCT_ACTIVE_FROM:null,
         PRODUCT_ACTIVE_TO:null,
         PRODUCT_CODE:null,
         PRODUCT_KEY:null,
         PRODUCT_LOCK_KEY:null,
         PRODUCT_NAME:null,
         PRODUCT_PURPOSE:null,
         PRODUCT_ORDER_BY:null,
         PRODUCT_DEPLOYED_URL:null
    }
  }
  ngOnInit(): void {
    this.fetchData();
  } 
  fetchData() {
    this.rowData=null;
    this.temp=[];
    this.Productapi.getApiData().subscribe((data: any) => {
      for(let i=0;i<data.message.length;i++){
        if(data.message[i].PRODUCT_ACTIVE_FLAG=='W'){
          this.temp.push(data.message[i]);
        }
      }      
      this.rowData=this.temp;
      for (let i=0; i < this.temp.length; i++) {
        this.rowData[i].PRODUCT_ACTIVE_FROM = this.formatDate(this.rowData[i].PRODUCT_ACTIVE_FROM);
        this.rowData[i].PRODUCT_ACTIVE_TO = this.formatDate(this.rowData[i].PRODUCT_ACTIVE_TO);
      }
    });
  }
  columnDefs = [
    {
      headerName: 'Product Code', field: 'PRODUCT_CODE', width: 150, sortable: true, checkboxSelection:true,
      valueGetter: function (params) {
        if (params.data.PRODUCT_CODE == 'NULL' || params.data.PRODUCT_CODE == null)
          return ' ';
        return params.data.PRODUCT_CODE;
      }
    },
    {
      headerName: 'Product Name', field: 'PRODUCT_NAME', width: 250, sortable: true, 
      valueGetter: function (params) {
        if (params.data.PRODUCT_NAME == 'NULL' || params.data.PRODUCT_NAME == null)
          return ' ';
        return params.data.PRODUCT_NAME;
      }
    },
    {
      headerName: 'Product Purpose', field: 'PRODUCT_PURPOSE', width: 250, sortable: true, 
      valueGetter: function (params) {
        if (params.data.PRODUCT_PURPOSE == 'NULL' || params.data.PRODUCT_PURPOSE == null)
          return ' ';
        return params.data.PRODUCT_PURPOSE;
      }
    },
    {
      headerName: 'Product URL', field: 'PRODUCT_DEPLOYED_URL', width: 300, sortable: true, 
      valueGetter: function (params) {
        if (params.data.PRODUCT_DEPLOYED_URL == 'None' || params.data.PRODUCT_DEPLOYED_URL == null)
          return ' ';
        return params.data.PRODUCT_DEPLOYED_URL;
      }
    },
    {
      headerName: 'Order By', field: 'PRODUCT_ORDER_BY', width: 120, sortable: true, 
      valueGetter: function (params) {
        if (params.data.PRODUCT_ORDER_BY == 'NULL' || params.data.PRODUCT_ORDER_BY == null)
          return ' ';
        return params.data.PRODUCT_ORDER_BY;
      }
    },
    {
      headerName: 'Active flag', field: 'PRODUCT_ACTIVE_FLAG', width: 120, sortable: true, 
      valueGetter: function (params) {
        if (params.data.PRODUCT_ACTIVE_FLAG == 'Y')
          return 'Active';
        if (params.data.PRODUCT_ACTIVE_FLAG == 'N')
          return 'InActive';
        if (params.data.PRODUCT_ACTIVE_FLAG == 'W')
          return 'Waiting For Approval';
        return ' ';
      }
    },
    {
      headerName: 'Active from', field: 'PRODUCT_ACTIVE_FROM', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.PRODUCT_ACTIVE_FROM == 'NULL' || params.data.PRODUCT_ACTIVE_FROM == null)
          return ' ';
        return params.data.PRODUCT_ACTIVE_FROM;
      }
    },
    {
      headerName: 'Active to', field: 'PRODUCT_ACTIVE_TO', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.PRODUCT_ACTIVE_TO == 'NULL' || params.data.PRODUCT_ACTIVE_TO == null)
          return ' ';
        return params.data.PRODUCT_ACTIVE_TO;
      }
    }
  ];
  formatDate(date) {
    return this.datepipe.transform(date, this.global.DATE_FORMAT_OUTPUT);
  }
  onRowDoubleClick(event) {
    var key=event.node.data.PRODUCT_KEY;
    this.router.navigate(['/Productedit/' + key], { queryParams: { mode: 'read' } });
  }
  
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.selectedDataStringPresentation = selectedData.map(node => node.PRODUCT_KEY + ':' + node.PRODUCT_NAME).join(', ');

  }
  onSelectionChanged() {
    this.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML = this.selectedDataStringPresentation;
  }
  onRowSelected(event) {
    var key = event.node.data.PRODUCT_KEY;
    const index: number = this.selectedRows.indexOf(key);
    if (event.node.isSelected()) {
      this.selectedRows.push(key);
    }
    else{
      if (index !== -1) {
          this.selectedRows.splice(index, 1);
      }      
    }
    console.log(this.selectedRows);
  }
  reject() {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // this.selectedId = +selectedNodes.map(node => node.data.PRODUCT_KEY);
    if (this.selectedRows.length==0)
      alert('Please,Select any one row!');
    else {
      var r = confirm("Do you want to delete?\nPlease confirm by clicking 'Ok'");
      if(r==true){
        alert('Deleted id:' + this.selectedRows);
        this.Productapi.deleteproduct(this.selectedRows).subscribe(() => {
        this.fetchData();
        this.selectedRows=[];
        (error: ProductModel) => { console.log(error); }
      });  
      }     
    }
  }
  openSnackBar(msg) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  
  approve() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map(node => node.data.PRODUCT_KEY);
    if (this.selectedId === 0)
      alert('Please,Select any one row!');
    else if(selectedNodes.length>1){
        alert('Select One Record Only!!');
    }
    else {
      this.Productapi.getproduct(this.selectedId).subscribe(
        (data:any) => {
          var getdata = data;
          this.product = getdata.message[0];
          this.product.PRODUCT_ACTIVE_FLAG='Y';
        });
      setTimeout(()=>{
        this.Productapi.updateproduct(this.product).subscribe((data: any) => {
          if (data.status == "success") {
          this.fetchData();
          console.log(data);
          this.router.navigate(['/ProductApproval']);
          this.openSnackBar('Product Approved!!!');
          }
        },
          (error: any) => { console.log(error); 
            this.openSnackBar('Product Not Approved');}
        );
      },2000);      
    }
  }
}

