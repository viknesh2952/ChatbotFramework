import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolemasterApiService } from 'src/app/Rolemasterapi.service';
import { Router } from '@angular/router';
import { RoleModel } from 'src/app/models/role.model';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import * as global from 'src/config';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master-grid.component.html',
  })
export class RoleMasterComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  gridOptions = {
    columnDefs: 'columnDefs',
    rowData: 'rowData',
    rowSelection: 'single',
    defaultColDef:'defaultColDef',
    colResizeDefault:'colResizeDefault',
    getRowStyle :'getRowStyle'
  };

  public rowClassRules;
  public modules: any[] = [
    ClientSideRowModelModule,
    SetFilterModule,
    MenuModule,
    ColumnsToolPanelModule,
  ];
  defaultColDef: { resizable: boolean; filter:string;floatingFilter:boolean;};

  rowData: RoleModel;
  temp:any;
  selectedDataStringPresentation;
  colResizeDefault: string;
  role_code: any;
  selectedId:any;
  selectedkey:any;
  deldata: { user_key:string, user_code:string };

  constructor(private http: HttpClient,
    private roleapi: RolemasterApiService,
    private router: Router,
    private datepipe: DatePipe) {
      this.colResizeDefault='shift';
      this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
      this.rowClassRules = {
          'deleted-row': function (params) {
            var active = params.data.active_flag;
            return active=='N';
          }
        };
      }
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.roleapi.getApiData().subscribe((data: RoleModel) => {
      console.log(data);
      this.temp=data;
      this.rowData=this.temp.message;
      for (let i = 0; i < data.message.length; i++) {
        this.rowData[i].role_active_from = this.formatDate(
          this.rowData[i].role_active_from
        );
        this.rowData[i].role_active_to = this.formatDate(
          this.rowData[i].role_active_to
        );
      }

    });
  }
   columnDefs = [
    //  { headerName: 'Role key', field: 'role_key', width:120, sortable: true, filter: true, checkboxSelection:true,
    //  valueGetter: function(params) {
    //   if(params.data.role_key=='NULL'||params.data.role_key==null)
    //     return ' ';
    //   return params.data.role_key;
    //  }
    // },
      { headerName: 'role code', field: 'role_code', sortable: true, checkboxSelection:true,
      cellStyle :function (params){
        if (params.data.role_active_status == 'N')
          return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
      } ,
      valueGetter: function(params) {
       if(params.data.role_code=='NULL'||params.data.role_code==null)
         return ' ';
      return params.data.role_code;
    } },
     { headerName: 'Role description',field:'role_description', sortable: true,
     cellStyle :function (params){
      if (params.data.role_active_status == 'N')
        return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
    } ,
     valueGetter: function(params) {
      if(params.data.role_description=='NULL'||params.data.role_description==null)
        return ' ';
      return params.data.role_description;
    } },
     { headerName: 'Role active status', field: 'role_active_status', sortable: true,
     cellStyle :function (params){
      if (params.data.role_active_status == 'N')
        return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
    } ,
     valueGetter: function(params) {
      if (params.data.role_active_status == 'Y') return 'Active';
      else if (params.data.role_active_status == 'N') {
        return 'Inactive ';
      }else (params.data.role_active_status == 'W'); return 'Waiting for Approval';
    } },
     { headerName: 'Role active from', field: 'role_active_from', sortable: true,
     cellStyle :function (params){
      if (params.data.role_active_status == 'N')
        return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
    } ,
     valueGetter: function(params) {
      if(params.data.role_active_from=='NULL'||params.data.role_active_from==null)
        return ' ';
      return params.data.role_active_from;
    } },
     { headerName: 'Role active to', field: 'role_active_to', sortable: true,
     cellStyle :function (params){
      if (params.data.role_active_status == 'N')
        return { color: '#000000', backgroundColor: '  rgb(252, 200, 186)' };
    } ,
     valueGetter: function(params) {
      if(params.data.role_active_to=='NULL'||params.data.role_active_to==null)
        return ' ';
      return params.data.role_active_to;
    } },
    //  { headerName: 'Role lock key', field: 'role_lock_key', sortable: true, filter: true,
    //  valueGetter: function(params) {
    //   if(params.data.role_lock_key=='NULL'||params.data.role_lock_key==null)
    //     return ' ';
    //   return params.data.role_lock_key;
    // } },
    //  { headerName: 'Role profile key', field: 'role_profile_key', sortable: true, filter: true,
    //  valueGetter: function(params) {
    //   if(params.data.role_profile_key=='NULL'||params.data.role_profile_key==null)
    //     return ' ';
    //   return params.data.role_profile_key;
    // } },


  ];

  formatDate(date) {
    return this.datepipe.transform(date, global.DATE_FORMAT_OUTPUT);
  }


  onRowDoubleClick(){
    this.editrole();
  }
    getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.selectedDataStringPresentation = selectedData.map(node => node.role_code + ':' + node.role_description).join(', ');

  }
  onSelectionChanged() {
    this.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML = this.selectedDataStringPresentation;
  }

  editrole() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedId = selectedNodes.map(node => node.data.role_key);
    // const selectedUserkey = selectedNodes.map(node => node.data.role_key);
    this.router.navigate(['/Roleedit/'+ selectedId]);

  }
  createrole() {
    this.router.navigate(['/Roleedit/0']);
  }
  deleterole() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = selectedNodes.map(node => node.data.role_key);
    //this.selectedkey = +selectedNodes.map(node => node.data.role_key);
    if (this.selectedId === 0)
      alert('selet any row');
    else{
    // this.deldata={
    //   role_key: this.selectedkey,
    // }
    this.roleapi.deleterole(this.selectedId[0]).subscribe(()=> {
    console.log("deleted row:" + this.selectedId);
    this.fetchData();
    alert('Deleted id:' + this.selectedId);
    (error: RoleModel) => { console.log(error); }

    });
  }
}
}
