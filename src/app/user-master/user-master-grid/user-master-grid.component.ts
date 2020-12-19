import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserApiService } from 'src/app/Userapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import * as global from 'src/config';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master-grid.component.html',
})
export class UserMasterComponent implements OnInit {
  [x: string]: any;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  gridOptions = {
    columnDefs: 'columnDefs',
    rowData: 'rowData',
    rowSelection: 'multiple',
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

  rowData: UserModel;
  temp: any;
  selectedDataStringPresentation;

  colResizeDefault: string;
  app_id: any;
  user_key:any;
  user_code: any;
  selectedkey: any;
  deldata: { user_key: string; user_code: string };
  selectedId: any;
  message: any;
  selectedrows:any[]=[];
  selectedrows1:any[]=[];

  constructor(
    private http: HttpClient,
    private Userapi: UserApiService,
    private _route: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe
  ) {
    this.colResizeDefault = 'shift';
    this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
    this.rowClassRules = {
      'deleted-row': function (params) {
        var active = params.data.user_active_status;
        return active == 'N';
      },
      'waiting-for-approval':function (params) {
        var active = params.data.user_active_status;
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
  fetchData() {
    //if (this.app_id == 0){
    this.Userapi.getApiData().subscribe((data: UserModel) => {
      console.log(data);
      this.temp = data;
      this.rowData = this.temp.message;
      for (let i = 0; i < data.message.length; i++) {
        this.rowData[i].user_active_from = this.formatDate(
          this.rowData[i].user_active_from
        );
        this.rowData[i].user_active_to = this.formatDate(
          this.rowData[i].user_active_to
        );
      }
    });
    // }
  }

  columnDefs = [
    {
      headerName: 'User Code',
      field: 'user_code',
      width: 120,
      sortable: true,

      // cellStyle: function (params) {
      //   if (params.data.user_active_status == 'N')
      //     return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
      // },

      checkboxSelection: function(params){
        if(params.data.user_active_status=='Y'){
          return true;
        }
        return false;
      },
      function(params) {
        if (params.data.active == 'Y') return true;
        return false;
      },
      valueGetter: function (params) {
        if (params.data.user_code == 'NULL' || params.data.user_code == null)
          return ' ';
        return params.data.user_code;
      },
    },
    {
      headerName: 'User First name',
      field: 'user_first_name',
      sortable: true,

      // cellStyle: function (params) {
      //   if (params.data.user_active_status == 'N')
      //     return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
      // },
      valueGetter: function (params) {
        if (
          params.data.user_first_name == 'NULL' ||
          params.data.user_first_name == null
        )
          return ' ';
        return params.data.user_first_name;
      },
    },
    {
      headerName: 'User Middle name',
      field: 'user_middle_name',
      sortable: true,

    //  cellStyle: function (params) {
    //     if (params.data.user_active_status == 'N')
    //       return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
    //   },
      valueGetter: function (params) {
        if (
          params.data.user_middle_name == 'NULL' ||
          params.data.user_middle_name == null
        )
          return ' ';
        return params.data.user_middle_name;
      },
    },
    {
      headerName: 'User Last name',
      field: 'user_last_name',
      sortable: true,

    //  cellStyle: function (params) {
    //     if (params.data.user_active_status == 'N')
    //       return { color: '#000000', BACKGROUNDCOLOR: '  rgb(252, 200, 186)' };
    //   },
      valueGetter: function (params) {
        if (
          params.data.user_last_name == 'NULL' ||
          params.data.user_last_name == null
        )
          return ' ';
        return params.data.user_last_name;
      },
    },
    {
      headerName: 'User Display name',
      field: 'user_display_name',
      sortable: true,

    //  cellStyle: function (params) {
    //     if (params.data.user_active_status == 'N')
    //       return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
    //   },
      valueGetter: function (params) {
        if (
          params.data.user_display_name == 'NULL' ||
          params.data.user_display_name == null
        )
          return ' ';
        return params.data.user_display_name;
      },
    },
    {
      headerName: 'Password',
      field: 'user_password',
      sortable: true,

    //  cellStyle: function (params) {
    //     if (params.data.user_active_status == 'N')
    //       return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
    //   },
      valueGetter: function (params) {
        if (
          params.data.user_password == 'NULL' ||
          params.data.user_password == null
        )
          return ' ';
        return params.data.user_password;
      },
    },
    {
      headerName: 'User Address Link',
      field: 'user_address_link',
      sortable: true,

    //  cellStyle: function (params) {
    //     if (params.data.user_active_status == 'N')
    //       return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
    //   },
      valueGetter: function (params) {
        if (
          params.data.user_address_link == 'NULL' ||
          params.data.user_address_link == null
        )
          return ' ';
        return params.data.user_address_link;
      },
    },
    // {
    //   headerName: 'User Default Profile Key',
    //   field: 'user_default_profile_key',
    //   sortable: true,
    //
    //  cellStyle: function (params) {
    //     if (params.data.user_active_status == 'N')
    //       return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
    //   },
    //   valueGetter: function (params) {
    //     if (
    //       params.data.user_default_profile_key == 'NULL' ||
    //       params.data.user_default_profile_key == null
    //     )
    //       return ' ';
    //     return params.data.user_default_profile_key;
    //   },
    // },
    {
      headerName: 'User Active Status',
      field: 'user_active_status',
      sortable: true,

    //  cellStyle: function (params) {
    //     if (params.data.user_active_status == 'N')
    //       return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
    //   },
      valueGetter: function (params) {
        if (params.data.user_active_status == 'Y'){ return 'Active';}

        else if (params.data.user_active_status == 'N') {
          return 'Inactive ';
        } else {
          return 'Waiting For Approval';
        }
      },
    },
    {
      headerName: 'User Active From',
      field: 'user_active_from',
      sortable: true,

    //  cellStyle: function (params) {
    //     if (params.data.user_active_status == 'N')
    //       return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
    //   },
      valueGetter: function (params) {
        if (
          params.data.user_active_from == 'NULL' ||
          params.data.user_active_from == null
        )
          return ' ';
        return params.data.user_active_from;
      },
    },
    {
      headerName: 'User Active To',
      field: 'user_active_to',
      sortable: true,

    //  cellStyle: function (params) {
    //     if (params.data.user_active_status == 'N')
    //       return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
    //   },
      valueGetter: function (params) {
        if (
          params.data.user_active_to == 'NULL' ||
          params.data.user_active_to == null
        )
          return ' ';
        return params.data.user_active_to;
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

  onRowDoubleClick(event) {
    var key=event.node.data.user_key;
    this.router.navigate(['/Useredit/'+ key], { queryParams: { mode: 'read' } });
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    this.selectedDataStringPresentation = selectedData
      .map((node) => node.user_code)
      .join(', ');
  }
  onSelectionChanged() {
    this.getSelectedRows();
    document.querySelector(
      '#selectedRows'
    ).innerHTML = this.selectedDataStringPresentation;
  }

  editUser() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map(node => node.data.user_key);
    if (this.selectedId === 0)
      alert('Please,Select any one row!');
    else if(selectedNodes.length>1){
        alert('Select One Record Only!!');
    }
    else {
      this.router.navigate(['/Useredit/' + '/' + this.selectedId]);
    }

    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // this.selectedId = selectedNodes.map(node => node.data.user_key);
    // const selectedUserkey = selectedNodes.map(node => node.data.user_code);
    // if (this.selectedId === 0)
    //   alert('Please,Select any one row!');
    // else
    //   this.router.navigate(['/Useredit/' + selectedUserkey + '/' + this.selectedId]);
  }
  createUser() {
    this.router.navigate(['/Useredit/0']);
  }
  onRowSelected(event) {
    var key = event.node.data.user_key;
    const index: number = this.selectedrows.indexOf(key);
    var code = event.node.data.user_code;
    const index1: number = this.selectedrows1.indexOf(code);
    if (event.node.isSelected()) {
      this.selectedrows.push(key);
      this.selectedrows1.push(code);
    }
    else{
      if (index !== -1) {
          this.selectedrows.splice(index, 1);
      }
      if (index1 !== -1) {
        this.selectedrows1.splice(index1, 1);
    }
    }
  }
  deleteUser() {
      if (this.selectedrows.length==0)
      alert('Please,Select any one row!');
    else {
      var r = confirm("Do you want to delete?\nPlease confirm by clicking 'Ok'");
      if(r==true){
      alert('Deleted id:' + this.selectedrows);
      this.Userapi.deleteuser(this.selectedrows).subscribe(() =>{
        this.fetchData();
        this.selectedrows=[];
        this.selectedrows1=[];
        (error: UserModel) => {
               console.log(error);
             };
      })
    }
    }
  }
}
