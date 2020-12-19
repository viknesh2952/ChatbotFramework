import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubModuleapiService } from 'src/app/sub-module-master/sub-moduleapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubModuleModel } from 'src/app/models/sub-module.model';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import * as global from 'src/config';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';


@Component({
  selector: 'app-sub-module-grid',
  templateUrl: './sub-module-grid.component.html',
  styleUrls: ['./sub-module-grid.component.css']
})
export class SubModuleGridComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  gridOptions = {
    columnDefs: 'columnDefs',
    rowData: 'rowData',
    rowSelection: 'single',
    defaultColDef: 'defaultColDef',
    colResizeDefault: 'colResizeDefault',
    getRowStyle: 'getRowStyle',
  };

  public rowClassRules;
  rowData: SubModuleModel;
  public modules: any[] = [
    ClientSideRowModelModule,
    SetFilterModule,
    MenuModule,
    ColumnsToolPanelModule,
  ];
  defaultColDef: { resizable: boolean; filter:string;floatingFilter:boolean;};

  temp: any;
  selectedDataStringPresentation;
  colResizeDefault: string;
  selectedkey: any;
  selectedId: any;
  message: any;
  app_id:any;

  constructor(
    private http: HttpClient,
    private SubModuleapi: SubModuleapiService,
    private _route: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe
  ){
    this.colResizeDefault = 'shift';
    this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
    this.rowClassRules = {
      'deleted-row': function (params) {
        var active = params.data.SUB_MODULE_ACTIVE_FLAG;
        return active == 'N';
      },
      'waiting-for-approval':function (params) {
        var active = params.data.SUB_MODULE_ACTIVE_FLAG;
        return active == 'W';
      }
    };
  }


  ngOnInit(): void {
    this._route.paramMap.subscribe((parameterMap) => {
      this.app_id = +parameterMap.get('appid');
      this.fetchData();
    });
  }
  fetchData(){
    this.SubModuleapi.getApiData().subscribe((data: SubModuleModel) =>{
      console.log(data);
      this.temp = data;
      this.rowData = this.temp.message;
      for (let i = 0; i < data.message.length; i++) {
        this.rowData[i].SUB_MODULE_ACTIVE_FROM = this.formatDate(
          this.rowData[i].SUB_MODULE_ACTIVE_FROM
        );
        this.rowData[i].SUB_MODULE_ACTIVE_FROM = this.formatDate(
          this.rowData[i].SUB_MODULE_ACTIVE_FROM
        );
      }
    });
  }columnDefs = [
    {
    headerName: ' Sub Module Code',
    feild: 'SUB_MODULE_CODE',
    width:120,
    sortable: true,


    checkboxSelection: true,
      function(params) {
        if (params.data.active == 'Y') return true;
        return false;
      },

      valueGetter: function (params){
        if ( params.data.SUB_MODULE_CODE == 'NULL' || params.data.SUB_MODULE_CODE == null )
          return ' ' ;
        return params.data.SUB_MODULE_CODE;
      },
    },

    {
      headerName: 'Sub_module Name',
      field: 'SUB_MODULE_NAME',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.SUB_MODULE_NAME == 'NULL' ||
          params.data.SUB_MODULE_NAME == null
        )
          return ' ';
        return params.data.SUB_MODULE_NAME;
      },
    },
    {
      headerName:'Product',
      field:'product',
      sortable:true,
      valueGetter:function(params){

      }
    },
    {
      headerName: 'Active Status',
      field: 'SUB_MODULE_ACTIVE_FLAG',
      sortable: true,


      valueGetter: function (params) {
       if (params.data.SUB_MODULE_ACTIVE_FLAG =='A')
        return 'Active'
      else if (params.data.SUB_MODULE_ACTIVE_FLAG =='W')
        return 'Waiting for approval'
      else {
        return 'Inactive'
      }

      },
    },
    {
      headerName: 'Order By',
      field: 'SUB_MODULE_ORDER_BY',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.SUB_MODULE_ORDER_BY == 'NULL' ||
          params.data.SUB_MODULE_ORDER_BY == null
        )
          return ' ';
        return params.data.SUB_MODULE_ORDER_BY;
      },
    },
    {
      headerName: 'Sub_module Page',
      field: 'SUB_MODULE_PAGE',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.SUB_MODULE_PAGE == 'NULL' ||
          params.data.SUB_MODULE_PAGE == null
        )
          return 'null ';
        return params.data.MODULE_PAGE;
      },
    },

    {
      headerName: 'Sub_module Path',
      field: 'SUB_MODULE_PATH',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.SUB_MODULE_PATH == 'NULL' ||
          params.data.SUB_MODULE_PATH == null
        )
          return 'null ';
        return params.data.SUB_MODULE_PATH;
      },
    },
    {
      headerName: 'Sub_module icon',
      field: 'SUB_MODULE_ICON',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.SUB_MODULE_ICON == 'NULL' ||
          params.data.SUB_MODULE_ICON == null
        )
          return 'null ';
        return params.data.SUB_MODULE_ICON;
      },
    },

    {
      headerName: 'Sub_module Password',
      field: 'SUB_MODULE_PASSWORD_REQUIRED',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.SUB_MODULE_PASSWORD_REQUIRED == 'NULL' ||
          params.data.SUB_MODULE_PASSWORD_REQUIRED == null
        )
          return '';
        return params.data.SUB_MODULE_PASSWORD_REQUIRED;
      },
    },
    {
      headerName: 'Sub_module Prefix',
      field: 'SUB_MODULE_PREFIX',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.SUB_MODULE_PREFIX == 'NULL' ||
          params.data.SUB_MODULE_PREFIX == null
        )
          return ' ';
        return params.data.SUB_MODULE_PREFIX;
      },
    },
    {
      headerName: 'Sub_module Active From',
      field: 'SUB_MODULE_ACTIVE_FROM',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.SUB_MODULE_ACTIVE_FROM == 'NULL' ||
          params.data.SUB_MODULE_ACTIVE_FROM == null
        )
          return ' ';
        return params.data.SUB_MODULE_ACTIVE_FROM;
      },
    },

    {
      headerName: 'Sub_module Active to',
      field: 'SUB_MODULE_ACTIVE_TO',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.SUB_MODULE_ACTIVE_TO == 'NULL' ||
          params.data.SUB_MODULE_ACTIVE_TO == null
        )
          return ' ';
        return params.data.SUB_MODULE_ACTIVE_TO;
      },
    },

    {
      headerName: 'Sub Module Applicability',
      field: 'SUB_APPLICABILITY',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.SUB_APPLICABILITY == 'NULL' ||
          params.data.SUB_APPLICABILITY == null
        )
          return ' ';
        return params.data.SUB_APPLICABILITY;
      },
    },



  ]

  formatDate(date){
    return this.datepipe.transform(date, global.DATE_FORMAT_OUTPUT);
  }

  onRowDoubleClick(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map((node) => node.data.SUB_MODULE_KEY);
    const selectedAppId = selectedNodes.map((node) => node.data.SUB_MODULE_CODE);
    this.router.navigate(
      ['/submoduleedit/' + selectedAppId + '/' + this.selectedId],
      { queryParams: { mode: 'read' } }
    );
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    this.selectedDataStringPresentation = selectedData
      .map((node) => node.SUB_MODULE_CODE)
      .join(', ');
  }
  onSelectionChanged() {
    this.getSelectedRows();
    document.querySelector(
      '#selectedRows'
    ).innerHTML = this.selectedDataStringPresentation;
  }
  editModule() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map((node) => node.data.SUB_MODULE_KEY);
   // const selectedAppId = selectedNodes.map(node => node.data.SUB_MODULE_CODE);
    if (this.selectedId === 0) alert('Please,Select any one row!');
    else this.router.navigate(['/submoduleedit/' + '/' + this.selectedId ]);
  }
  createModule() {
    this.router.navigate(['/submoduleedit/0']);
  }

  deleteModule() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = selectedNodes.map((node) => node.data.SUB_MODULE_CODE);
    this.selectedkey = selectedNodes.map((node) => node.data.SUB_MODULE_KEY);
    if (this.selectedId === 0) alert('Please,Select any one row!');
    else {

      this.SubModuleapi.deleteSubmodule(
        this.selectedkey[0],
        this.selectedId[0]
      ).subscribe(() => {
        console.log('deleted row:' + this.selectedkey[0], this.selectedId[0]);
        this.fetchData();
        alert('Deleted id:' + this.selectedId);
        (error: SubModuleModel) => {
          console.log(error);
        };
      });
    }
  }
}
