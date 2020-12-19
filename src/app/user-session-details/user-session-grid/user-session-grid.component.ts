import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSessionApiService } from '../user-session-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionDetails } from 'src/app/models/user-session.model';
import { AgGridAngular } from 'ag-grid-angular';
import {AppConfigService} from 'src/app/app-config.service';
import { DatePipe } from '@angular/common';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenunameService } from 'src/app/menuname.service';
@Component({
  selector: 'app-user-session-grid',
  templateUrl: './user-session-grid.component.html',
  styleUrls: ['./user-session-grid.component.css']
})
export class UserSessionGridComponent implements OnInit {
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
  rowData: UserSessionDetails;
  temp: any;
  selectedDataStringPresentation;
  colResizeDefault: string;
  selectedId: number;
  protected dynamic=AppConfigService.settings;
  global;

  constructor(private http: HttpClient,
    private api: UserSessionApiService,
    private router: Router,
    private menunameservice:MenunameService,
    private _route: ActivatedRoute,
    private datepipe:DatePipe) {
    this.global=this.dynamic.global;
    this.menunameservice.routeAuth(this.router.url);
    this.colResizeDefault = 'shift';
    this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
    this.rowClassRules = {
      'deleted-row': function (params) {
        var active = params.data.ush_active_status;
        return active == 'N';
      }
    };
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
        this.rowData[i].usd_login_on=this.formatDate(this.rowData[i].usd_login_on);
        this.rowData[i].usd_last_db_access=this.formatDate(this.rowData[i].usd_last_db_access);
        this.rowData[i].ush_purge_on=this.formatDate(this.rowData[i].ush_purge_on);
        this.rowData[i].ush_logout_on=this.formatDate(this.rowData[i].ush_logout_on);
        this.rowData[i].ush_created_on=this.formatDate(this.rowData[i].ush_created_on);
      }
    });
  }
  formatDate(date){
    return this.datepipe.transform(date,this.global.DATE_FORMAT_OUTPUT);
  }
  columnDefs = [
    {
      headerName: 'Session Id', field: 'usd_session_id', width: 250, sortable: true,  checkboxSelection: false,
      valueGetter: function (params) {
        if (params.data.usd_session_id == 'NULL' || params.data.usd_session_id == null)
          return ' ';
        return params.data.usd_session_id;
      }
    },
    {
      headerName: 'User', field: 'usd_user_key', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.usd_user_key == 'NULL' || params.data.usd_user_key == null)
          return ' ';
        return params.data.usd_user_key;
      }
    },
    {
      headerName: 'User Profile Role', field: 'usd_user_profile_role_key', width: 250, sortable: true,  
      valueGetter: function (params) {
        if (params.data.usd_user_profile_role_key == 'NULL' || params.data.usd_user_profile_role_key == null)
          return ' ';
        return params.data.usd_user_profile_role_key;
      }
    },
    {
      headerName: 'Login On', field: 'usd_login_on', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.usd_login_on == 'NULL' || params.data.usd_login_on == null)
          return ' ';
        return params.data.usd_login_on;
      }
    },
    {
      headerName: 'Last DB Access', field: 'usd_last_db_access', width: 250, sortable: true, 
      valueGetter: function (params) {
        if (params.data.usd_last_db_access == 'NULL' || params.data.usd_last_db_access == null)
          return ' ';
        return params.data.usd_last_db_access;
      }
    },
    {
      headerName: 'Time Zone', field: 'ush_time_zone', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.ush_time_zone == 'NULL' || params.data.ush_time_zone == null)
          return ' ';
        return params.data.ush_time_zone;
      }
    },
    {
      headerName: 'Active Status', field: 'ush_active_status', width: 250, sortable: true, 
      valueGetter: function (params) {
        if (params.data.ush_active_status == 'Y')
          return 'Active';
        return ' ';
      }
    },
    {
      headerName: 'Purge On', field: 'ush_purge_on', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.ush_purge_on == 'NULL' || params.data.ush_purge_on == null)
          return ' ';
        return params.data.ush_purge_on;
      }
    },
    {
      headerName: 'Logout On', field: 'ush_logout_on', width: 250, sortable: true, 
      valueGetter: function (params) {
        if (params.data.ush_logout_on == 'NULL' || params.data.ush_logout_on == null)
          return ' ';
        return params.data.ush_logout_on;
      }
    },
    {
      headerName: 'IP Address', field: 'ush_ip_address', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.ush_ip_address == 'NULL' || params.data.ush_ip_address == null)
          return ' ';
        return params.data.ush_ip_address;
      }
    },
    {
      headerName: 'Created On', field: 'ush_created_on', width: 250, sortable: true,  
      valueGetter: function (params) {
        if (params.data.ush_created_on == 'NULL' || params.data.ush_created_on == null)
          return ' ';
        return params.data.ush_created_on;
      }
    }
  ];
  onRowDoubleClick() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map(node => node.data.usd_key);
    this.router.navigate(['/UserSessionedit/'+ this.selectedId], { queryParams: { mode: 'read' } });
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.selectedDataStringPresentation = selectedData.map(node => node.usd_key + ':' + node.usd_user_key).join(', ');

 }
 onSelectionChanged() {
  this.getSelectedRows();
  document.querySelector('#selectedRows').innerHTML = this.selectedDataStringPresentation;
}
//   editusersessiondetail() {
//     const selectedNodes = this.agGrid.api.getSelectedNodes();
//     this.selectedId = +selectedNodes.map(node => node.data.usd_key);
//     if (this.selectedId === 0)
//       alert('Please,Select any one row!');
//     else
//       this.router.navigate(['/UserSessionedit/'+ this.selectedId]);
//   }
//   createusersessiondetail() {
//     this.router.navigate(['/UserSessionedit/0']);
//   }
//   deleteusersessiondetail() {
//     let temp1,temp2,temp3;
//     const selectedNodes = this.agGrid.api.getSelectedNodes();
//     this.selectedId = +selectedNodes.map(node => node.data.usd_key);
//     temp1 =+selectedNodes.map(node => node.data.usd_session_id);
//     temp2 =+selectedNodes.map(node => node.data.usd_user_key);
//     temp3 =+selectedNodes.map(node => node.data.usd_user_profile_role_key);
//     if (this.selectedId === 0)
//       alert('Please,Select any one row!');
//     else {
//     alert('Deleted id:'+this.selectedId);
//     this.api.deleteUserSessionDetails(this.selectedId,temp1,temp2,temp3).subscribe(()=> {
//       this.fetchData();
//       (error: UserSessionDetails) => { console.log(error); }
//     });
//   }
// }
}
 
