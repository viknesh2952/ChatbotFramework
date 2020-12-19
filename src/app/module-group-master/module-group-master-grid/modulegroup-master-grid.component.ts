import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModulegroupApiService } from '../modulegroup-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Modulegroupmodel } from 'src/app/models/modulegroup.model';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import {AppConfigService} from 'src/app/app-config.service';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenunameService } from 'src/app/menuname.service';
@Component({
  selector: 'modulegroup-master-grid',
  templateUrl: './modulegroup-master-grid.component.html'
})
export class ModulegroupMasterGridComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  gridOptions = {
    columnDefs: 'columnDefs',
    rowData: 'rowData',
    rowSelection: 'single',
    defaultColDef: 'defaultColDef',
    colResizeDefault: 'colResizeDefault',
    getRowStyle: 'getRowStyle'
  };
  public rowClassRules;
  public modules: any[] = [
    ClientSideRowModelModule,
    SetFilterModule,
    MenuModule,
    ColumnsToolPanelModule,
  ];
  defaultColDef: { resizable: boolean; filter:string;floatingFilter:boolean;};
  rowData: Modulegroupmodel;
  temp: any;
  selectedDataStringPresentation;
  colResizeDefault: string;
  selectedId: number;
  selectedProductId: number;
  protected dynamic=AppConfigService.settings;
  global;
  selectedRows: any[]=[];
  selectedRows1: any[]=[];

  constructor(private http: HttpClient,
    private api: ModulegroupApiService,
    private router: Router,
    private menunameservice:MenunameService,
    private _route: ActivatedRoute,
    private datepipe:DatePipe) {
      this.menunameservice.routeAuth(this.router.url);
    this.colResizeDefault = 'shift';
    this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
    this.rowClassRules = {
      'deleted-row': function (params) {
        var active = params.data.MODGRP_ACTIVE_FLAG;
        return active == 'N';
      },
      'waiting-for-approval':function (params) {
        var active = params.data.MODGRP_ACTIVE_FLAG;
        return active == 'W';
      }
    };
    this.global=this.dynamic.global;
  }
  ngOnInit(): void {
      this.fetchData();
  }
  fetchData() {
      this.api.getApiData().subscribe((data: any) => {
        console.log(data);
        this.temp = data;
        this.rowData = this.temp.message;
        for(let i=0;i<data.message.length;i++){
          this.rowData[i].MODGRP_ACTIVE_FROM=this.formatDate(this.rowData[i].MODGRP_ACTIVE_FROM);
          this.rowData[i].MODGRP_ACTIVE_TO=this.formatDate(this.rowData[i].MODGRP_ACTIVE_TO);
        }
      });
  }
  columnDefs = [
     {
      headerName: 'Module Group Name', field: 'MODGRP_NAME', width: 230, sortable: true,
      checkboxSelection: function (params) {
        if (params.data.MODGRP_ACTIVE_FLAG == 'Y' ||params.data.MODGRP_ACTIVE_FLAG=='W')
          return true;
        return false;
      },  
      valueGetter: function (params) {
        if (params.data.MODGRP_NAME == 'NULL' || params.data.MODGRP_NAME == null)
          return ' ';
        return params.data.MODGRP_NAME;
      }
    },
    {
      headerName: 'Product Name', field: 'PRODUCT_NAME', width: 250, sortable: true,
      valueGetter: function (params) {
        if (params.data.PRODUCT_NAME == null)
          return ' ';
        return params.data.PRODUCT_NAME;
      }
    },
    {
      headerName: 'Active Flag', field: 'MODGRP_ACTIVE_FLAG', width: 120, sortable: true, 
      valueGetter: function (params) {
        if (params.data.MODGRP_ACTIVE_FLAG == 'Y')
          return 'Active';
        if (params.data.MODGRP_ACTIVE_FLAG == 'N')
          return 'InActive';
        if (params.data.MODGRP_ACTIVE_FLAG == 'W')
          return 'Waiting For Approval';
        return ' ';
      }
    },
    {
      headerName: 'Active From', field: 'MODGRP_ACTIVE_FROM', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.MODGRP_ACTIVE_FROM == 'NULL' || params.data.MODGRP_ACTIVE_FROM == null)
          return ' ';
        return params.data.MODGRP_ACTIVE_FROM;
      }
    },
    {
      headerName: 'Active To', field: 'MODGRP_ACTIVE_TO', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.MODGRP_ACTIVE_TO == 'NULL' || params.data.MODGRP_ACTIVE_TO == null)
          return ' ';
        return params.data.MODGRP_ACTIVE_TO;
      }
    },
    {
      headerName: 'Applicability', field: 'MODGRP_APPLICABILITY', width: 250, sortable: true, 
      valueGetter: function (params) {
        if (params.data.MODGRP_APPLICABILITY == 'NULL' || params.data.MODGRP_APPLICABILITY == null)
          return ' ';
        return params.data.MODGRP_APPLICABILITY;
      }
    },
    {
      headerName: 'Order By', field: 'MODGRP_ORDER_BY', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.MODGRP_ORDER_BY == 'NULL' || params.data.MODGRP_ORDER_BY == null)
          return ' ';
        return params.data.MODGRP_ORDER_BY;
      }
    },
  ];
  formatDate(date){
    return this.datepipe.transform(date,this.global.DATE_FORMAT_OUTPUT);
  }
  onRowDoubleClick(event) {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // this.selectedId = +selectedNodes.map(node => node.data.MODGRP_KEY);
    var key=event.node.data.MODGRP_KEY;
    this.router.navigate(['/ModuleGroupedit/'+ key], { queryParams: { mode: 'read' } });
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.selectedDataStringPresentation = selectedData.map(node => node.MODGRP_KEY + ':' + node.MODGRP_NAME).join(', ');
  }
  onSelectionChanged() {
    this.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML = this.selectedDataStringPresentation;
  }

  editmoduleGroup() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map(node => node.data.MODGRP_KEY);
    if (this.selectedId === 0)
      alert('Please,Select any one row!');
    else if(selectedNodes.length>1){
        alert('Select One Record Only!!');
    }
    else
       this.router.navigate(['/ModuleGroupedit/' + this.selectedId]);
  }
  createmoduleGroup() {
    this.router.navigate(['/ModuleGroupedit/0']);
  }
  onRowSelected(event) {
    var key = event.node.data.MODGRP_KEY;
    var product_key = event.node.data.MODGRP_PRODUCT_KEY;
    const index: number = this.selectedRows.indexOf(key);
    const index1: number = this.selectedRows1.indexOf(product_key);
    if (event.node.isSelected()) {
      this.selectedRows.push(key);
      this.selectedRows1.push(product_key);
    }
    else{
      if (index !== -1) {
          this.selectedRows.splice(index, 1);
      }
      if (index1 !== -1) {
        this.selectedRows1.splice(index1, 1);
    } 
      
    }
    console.log(this.selectedRows);
  }
  deletemoduleGroup() {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // this.selectedId = +selectedNodes.map(node => node.data.MODGRP_KEY);
    // this.selectedProductId = +selectedNodes.map(node => node.data.MODGRP_PRODUCT_KEY);
    if (this.selectedRows.length==0)
      alert('Please,Select any one row!');
    else {
      var r = confirm("Do you want to delete?\nPlease confirm by clicking 'Ok'");
      if(r==true){
      alert('Deleted id:' + this.selectedRows);
      this.api.deleteModuleGroup(this.selectedRows,this.selectedRows1).subscribe(() => {
        this.fetchData();
            this.selectedRows=[];
            this.selectedRows1=[];
        (error: Modulegroupmodel) => { console.log(error); }
      });
    }
    }
  }
}
