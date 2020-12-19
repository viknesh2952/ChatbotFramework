import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgramMasterApiService } from 'src/app/program-master/program-master-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProgramModel } from 'src/app/models/program.model';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

import * as global from 'src/config';
@Component({
  selector: 'app-program-master',
  templateUrl: './program-master.component.html',

})
export class ProgramMasterComponent implements OnInit {
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

  rowData: ProgramModel;
  temp: any;
  selectedDataStringPresentation;
  //defaultColDef: { resizable: boolean };
  colResizeDefault: string;
  selectedkey: any;
  selectedId: any;
  message:string
  app_id:any;

  constructor(
    private http: HttpClient,
    private Programapi: ProgramMasterApiService,
    private _route: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe
  ){
    this.colResizeDefault = 'shift';
    this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
    this.rowClassRules = {
      'deleted-row': function (params) {
        var active = params.data.program_active_status;
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
  fetchData() {
    //if (this.app_id == 0){
    this.Programapi.getApiData().subscribe((data: ProgramModel) => {
      console.log(data);
      this.temp = data;
      this.rowData = this.temp.message;
      for (let i = 0; i < data.message.length; i++) {
        this.rowData[i].program_active_from = this.formatDate(
          this.rowData[i].program_active_from
        );
        this.rowData[i].program_active_to = this.formatDate(
          this.rowData[i].program_active_to
        );
      }
    });
  }

    columnDefs = [
      {
        headerName: 'Program Type',
        field: 'program_type',
        width: 120,
        sortable: true,

        cellStyle: function (params) {
          if (params.data.user_active_status == 'N')
            return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
        },

        checkboxSelection: true,
        function(params) {
          if (params.data.active == 'Y') return true;
          return false;
        },
        valueGetter: function (params) {
          if (params.data.program_type == 'NULL' || params.data.program_type == null)
            return ' ';
          return params.data.program_type;
        },
      },
      {
        headerName: 'Program Code',
        field: 'program_code',
        sortable: true,

        cellStyle: function (params) {
          if (params.data.active == 'N')
            return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
        },
        valueGetter: function (params) {
          if (
            params.data.program_code == 'NULL' ||
            params.data.program_code == null
          )
            return ' ';
          return params.data.program_code;
        },
      },
      {
        headerName: 'Program Descripition ',
        field: 'program_description',
        sortable: true,

       cellStyle: function (params) {
          if (params.data.active == 'N')
            return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
        },
        valueGetter: function (params) {
          if (
            params.data.program_description == 'NULL' ||
            params.data.program_description == null
          )
            return ' ';
          return params.data.program_description;
        },
      },
      {
        headerName: 'Program Page name',
        field: 'program_page_name',
        sortable: true,

       cellStyle: function (params) {
          if (params.data.active == 'N')
            return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
        },
        valueGetter: function (params) {
          if (
            params.data.program_page_name == 'NULL' ||
            params.data.program_page_name == null
          )
            return ' ';
          return params.data.program_page_name;
        },
      },
      {
        headerName: 'Program Page Path',
        field: 'program_page_path',
        sortable: true,

       cellStyle: function (params) {
          if (params.data.active == 'N')
            return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
        },
        valueGetter: function (params) {
          if (
            params.data.program_page_path == 'NULL' ||
            params.data.program_page_path == null
          )
            return ' ';
          return params.data.program_page_path;
        },
      },
      {
        headerName: 'Program Icon Path',
        field: 'program_icon_path',
        sortable: true,

       cellStyle: function (params) {
          if (params.data.active == 'N')
            return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
        },
        valueGetter: function (params) {
          if (
            params.data.program_icon_path == 'NULL' ||
            params.data.program_icon_path == null
          )
            return ' ';
          return params.data.program_icon_path;
        },
      },
      {
        headerName: 'Program Access control',
        field: 'program_access_control',
        sortable: true,

       cellStyle: function (params) {
          if (params.data.user_active_status == 'N')
            return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
        },
        valueGetter: function (params) {
          if (
            params.data.program_access_control == 'NULL' ||
            params.data.program_access_control == null
          )
            return ' ';
          return params.data.program_access_control;
        },
      },
      {
        headerName: 'Program Order',
        field: 'program_order',
        sortable: true,

       cellStyle: function (params) {
          if (params.data.active == 'N')
            return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
        },
        valueGetter: function (params) {
          if (
            params.data.program_order == 'NULL' ||
            params.data.program_order == null
          )
            return ' ';
          return params.data.program_order;
        },
      },
      {
        headerName: 'Program Active Status',
        field: 'program_active_status',
        sortable: true,

       cellStyle: function (params) {
          if (params.data.active == 'N')
            return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
        },
        valueGetter: function (params) {
          if (params.data.program_active_status == 'Y') return 'Active';
          else if (params.data.program_active_status == 'N') {
            return 'Inactive ';
          }
        },
      },
      {
        headerName: 'Program Active From',
        field: 'program_active_from',
        sortable: true,

       cellStyle: function (params) {
          if (params.data.active== 'N')
            return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
        },
        valueGetter: function (params) {
          if (
            params.data.program_active_from == 'NULL' ||
            params.data.program_active_from == null
          )
            return ' ';
          return params.data.program_active_from;
        },
      },
      {
        headerName: 'Program Active To',
        field: 'program_active_to',
        sortable: true,

       cellStyle: function (params) {
          if (params.data.active == 'N')
            return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
        },
        valueGetter: function (params) {
          if (
            params.data.program_active_to == 'NULL' ||
            params.data.program_active_to == null
          )
            return ' ';
          return params.data.program_active_to;
        },
      },
      //  { headerName: 'User Lock Key', field: 'user_lock_key', sortable: true,
      //  cellStyle :function (params){
      //   if (params.data.user_active_status == 'N')
      //     return{   color:'#ffffff',  backgroundColor:  ' #f22c5e'}
      // } ,
      //  valueGetter: function(params) {
      //   if(params.data.user_lock_key=='NULL'||params.data.user_lock_key==null)
      //     return ' ';
      //   return params.data.user_lock_key;
      // } },
      //  { headerName: 'User Profile Key', field: 'user_profile_key', sortable: true,
      //  cellStyle :function (params){
      //   if (params.data.user_active_status == 'N')
      //     return{   color:'#ffffff',  backgroundColor:  ' #f22c5e'}
      // } ,
      //  valueGetter: function(params) {
      //   if(params.data.user_profile_key=='NULL'||params.data.user_profile_key==null)
      //     return ' ';
      //   return params.data.user_profile_key;
      // } },
    ];

    formatDate(date) {
      return this.datepipe.transform(date, global.DATE_FORMAT_OUTPUT);
    }

    onRowDoubleClick() {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      this.selectedId = +selectedNodes.map((node) => node.data.Program_key);
      const selectedAppId = selectedNodes.map((node) => node.data.program_code);
      this.router.navigate(
        ['/Programedit/' + selectedAppId + '/' + this.selectedId],
        { queryParams: { mode: 'read' } }
      );
    }
    getSelectedRows() {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      this.selectedDataStringPresentation = selectedData
        .map((node) => node.program_code)
        .join(', ');
    }
    onSelectionChanged() {
      this.getSelectedRows();
      document.querySelector(
        '#selectedRows'
      ).innerHTML = this.selectedDataStringPresentation;
    }

    editProgram() {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      this.selectedId = +selectedNodes.map((node) => node.data.program_key);
      //const selectedAppId = selectedNodes.map(node => node.data.user_code);
      if (this.selectedId === 0) alert('Please,Select any one row!');
      else this.router.navigate(['/Programedit/' + '/' + this.selectedId]);

      // const selectedNodes = this.agGrid.api.getSelectedNodes();
      // this.selectedId = selectedNodes.map(node => node.data.user_key);
      // const selectedUserkey = selectedNodes.map(node => node.data.user_code);
      // if (this.selectedId === 0)
      //   alert('Please,Select any one row!');
      // else
      //   this.router.navigate(['/Useredit/' + selectedUserkey + '/' + this.selectedId]);
    }
    createProgram() {
      this.router.navigate(['/Programedit/0']);
    }
    deleteProgram() {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      this.selectedId = selectedNodes.map((node) => node.data.program_code);
      this.selectedkey = selectedNodes.map((node) => node.data.program_key);
      if (this.selectedId === 0) alert('Please,Select any one row!');
      else {
        // this.deldata = {
        //   user_key: this.selectedkey,
        //   user_code: this.selectedId,
        // }
        //  this.deldata.user_key= this.selectedkey;
        //  this.deldata.user_code= this.selectedId;
        this.Programapi.deleteprogram(
          this.selectedkey[0],
          this.selectedId[0]
        ).subscribe(() => {
          console.log('deleted row:' + this.selectedkey[0], this.selectedId[0]);
          this.fetchData();
          alert('Deleted id:' + this.selectedId);
          (error: ProgramModel) => {
            console.log(error);
          };
        });
      }
    }
  }

