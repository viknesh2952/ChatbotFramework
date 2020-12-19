import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModulemasterapiService } from 'src/app/module-master/modulemasterapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModuleModel } from 'src/app/models/module.model';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import * as global from 'src/config';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';


@Component({
  selector: 'app-module-master',
  templateUrl: './module-master.component.html',
  //styleUrls: ['6./module-master.component.css']
})
export class ModuleMasterComponent implements OnInit {
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
  public modules: any[] = [
    ClientSideRowModelModule,
    SetFilterModule,
    MenuModule,
    ColumnsToolPanelModule,
  ];
  defaultColDef: { resizable: boolean; filter:string;floatingFilter:boolean;};

  rowData: ModuleModel;
  temp: any;
  selectedDataStringPresentation;
  colResizeDefault: string;
  selectedkey: any;
  selectedId: any;
  deldata: { user_key: string; user_code: string };

  message: any;
  app_id:any;

  constructor(
    private http: HttpClient,
    private Moduleapi: ModulemasterapiService,
    private _route: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe
  ){
    this.colResizeDefault = 'shift';
    this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
    this.rowClassRules = {
      'deleted-row': function (params) {
        var active = params.data.MODULE_ACTIVE_FLAG;
        return active == 'N';
      },
    };
  }




  ngOnInit(): void {
    this._route.paramMap.subscribe((parameterMap) => {
      this.app_id = +parameterMap.get('appid');
      this.fetchData();
    });
  }

  fetchData(){
    this.Moduleapi.getApiData().subscribe((data: ModuleModel) =>{
      console.log(data);
      this.temp = data;
      this.rowData = this.temp.message;
      for (let i = 0; i < data.message.length; i++) {
        this.rowData[i].MODULE_ACTIVE_FROM = this.formatDate(
          this.rowData[i].MODULE_ACTIVE_FROM
        );
        this.rowData[i].MODULE_ACTIVE_TO = this.formatDate(
          this.rowData[i].MODULE_ACTIVE_TO
        );
      }
    });
  }

  columnDefs = [
    {
    headerName: 'Module Code',
    feild: 'MODULE_CODE',
    width:120,
    sortable: true,

    checkboxSelection: true,


    valueGetter: function (params){
        if ( params.data.MODULE_CODE == 'NULL' || params.data.MODULE_CODE == null )
          return ' ' ;
        return params.data.MODULE_CODE;
      },
    },

    {
      headerName: 'Module Name',
      field: 'MODULE_NAME',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.MODULE_NAME == 'NULL' ||
          params.data.MODULE_NAME == null
        )
          return ' ';
        return params.data.MODULE_NAME;
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
      field: 'MODULE_ACTIVE_FLAG',
      sortable: true,


      valueGetter: function (params) {
        if (params.data.MODULE_ACTIVE_FLAG =='Y')
        return 'Active'
      else if (params.data.MODULE_ACTIVE_FLAG =='W')
        return 'Waiting for approval'
      else {
        return 'Inactive'
      }
      },
    },
    {
      headerName: 'Order By',
      field: 'MODULE_ORDER_BY',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.MODULE_ORDER_BY == 'NULL' ||
          params.data.MODULE_ORDER_BY == null
        )
          return ' ';
        return params.data.MODULE_ORDER_BY;
      },
    },
    {
      headerName: 'Module Page',
      field: 'MODULE_PAGE',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.MODULE_PAGE == 'NULL' ||
          params.data.MODULE_PAGE == null
        )
          return ' ';
        return params.data.MODULE_PAGE;
      },
    },

    {
      headerName: 'Module Path',
      field: 'MODULE_PATH',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.MODULE_PATH == 'NULL' ||
          params.data.MODULE_PATH == null
        )
          return 'null ';
        return params.data.MODULE_PATH;
      },
    },
    {
      headerName: 'Module icon',
      field: 'module_icon',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.module_icon == 'NULL' ||
          params.data.module_icon == null
        )
          return 'null ';
        return params.data.module_icon;
      },
    },

    {
      headerName: 'Module Password',
      field: 'module_password_required',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.module_password_required == 'NULL' ||
          params.data.module_password_required == null
        )
          return '';
        return params.data.MODULE_PASSWORD_REQUIRED;
      },
    },
    {
      headerName: 'Module Prefix',
      field: 'MODULE_PREFIX',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.MODULE_PREFIX == 'NULL' ||
          params.data.MODULE_PREFIX == null
        )
          return ' ';
        return params.data.MODULE_PREFIX;
      },
    },
    {
      headerName: 'Module Active From',
      field: 'MODULE_ACTIVE_FROM',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.MODULE_ACTIVE_FROM == 'NULL' ||
          params.data.MODULE_ACTIVE_FROM == null
        )
          return ' ';
        return params.data.MODULE_ACTIVE_FROM;
      },
    },

    {
      headerName: 'Module Active to',
      field: 'MODULE_ACTIVE_TO',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.MODULE_ACTIVE_TO == 'NULL' ||
          params.data.MODULE_ACTIVE_TO == null
        )
          return ' ';
        return params.data.MODULE_ACTIVE_TO;
      },
    },

    {
      headerName: 'Module Applicability',
      field: 'MODULE_APPLICABILITY',
      sortable: true,


      valueGetter: function (params) {
        if (
          params.data.MODULE_APPLICABILITY == 'NULL' ||
          params.data.MODULE_APPLICABILITY == null
        )
          return ' ';
        return params.data.MODULE_APPLICABILITY;
      },
    },



  ]

  formatDate(date){
    return this.datepipe.transform(date, global.DATE_FORMAT_OUTPUT);
  }

  onRowDoubleClick(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map((node) => node.data.MODULE_KEY);
    const selectedAppId = selectedNodes.map((node) => node.data.MODULE_CODE);
    this.router.navigate(
      ['/Moduleedit/' + selectedAppId + '/' + this.selectedId],
      { queryParams: { mode: 'read' } }
    );
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    this.selectedDataStringPresentation = selectedData
      .map((node) => node.MODULE_CODE)
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
    this.selectedId = +selectedNodes.map((node) => node.data.MODULE_KEY);
    const selectedAppId = selectedNodes.map(node => node.data.MODULE_CODE);
    if (this.selectedId === 0) alert('Please,Select any one row!');
    else this.router.navigate(['/Moduleedit/' + '/' + this.selectedId]);
  }
  createModule() {
    this.router.navigate(['/Moduleedit/0']);
  }

  deleteModule() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = selectedNodes.map((node) => node.data.MODULE_CODE);
    this.selectedkey = selectedNodes.map((node) => node.data.MODULE_KEY);
    if (this.selectedkey === 0) alert('Please,Select any one row!');
    else {

      this.Moduleapi.deletemodule(
        this.selectedkey[0],
        this.selectedId[0]
      ).subscribe(() => {
        console.log('deleted row:' + this.selectedkey[0], this.selectedId[0]);
        this.fetchData();
        alert('Deleted id:' + this.selectedId);
        (error: ModuleModel) => {
          console.log(error);
        };
      });
    }
  }
}
