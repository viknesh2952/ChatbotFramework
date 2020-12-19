import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgramroleApiService } from '../programrole-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramRoleModel } from 'src/app/models/program-role.model';
import { AgGridAngular } from 'ag-grid-angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenunameService } from 'src/app/menuname.service';
// import '@ag-grid-community/core/dist/styles/ag-grid.css';
// import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
// import { Module } from 'ag-grid-community';

@Component({
  selector: 'app-program-role-grid',
  templateUrl: './program-role-grid.component.html'
})
export class ProgramRoleGridComponent implements OnInit {
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
  rowData: ProgramRoleModel;
  temp: any;
  selectedDataStringPresentation;
  colResizeDefault: string;
  selectedId: number;
  
  constructor(private http: HttpClient,
    private api: ProgramroleApiService,
    private menunameservice:MenunameService,
    private router: Router,
    private _route: ActivatedRoute) {
    this.menunameservice.routeAuth(this.router.url);
    this.colResizeDefault = 'shift';
    this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
  }
  ngOnInit(): void {
      this.fetchData();
  }
  fetchData() {
      this.api.getApiData().subscribe((data: ProgramRoleModel) => {
        console.log(data);
        this.temp = data;
        this.rowData = this.temp.message;
      });
  }
  columnDefs = [
    {
      headerName: 'Access Control', field: 'prro_access_control', width: 160, sortable: true,
      checkboxSelection:true,
      valueGetter: function (params) {
        if (params.data.prro_access_control == 'NULL' || params.data.prro_access_control == null)
          return ' ';
        return params.data.prro_access_control;
      }
    },
    {
      headerName: 'Program Description', field: 'program_description', width: 160, sortable: true,
      valueGetter: function (params) {
        if (params.data.program_description == 'NULL' || params.data.program_description == null)
          return ' ';
        return params.data.program_description;
      }
    },
    {
      headerName: 'Role Description', field: 'role_description', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.role_description == 'NULL' || params.data.role_description == null)
          return ' ';
        return params.data.role_description;
      }
    }
  ];
  onRowDoubleClick(event) {
    var key=event.node.data.prro_key;
    this.router.navigate(['/ProgramRoleedit/'+ key], { queryParams: { mode: 'read' } });
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.selectedDataStringPresentation = selectedData.map(node => node.prro_access_control + ':' + node.role_description).join(', ');
  }
  onSelectionChanged() {
    this.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML = this.selectedDataStringPresentation;
  }

  editProle() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map(node => node.data.prro_key);
    if (this.selectedId === 0)
      alert('Please,Select any one row!');
    else
       this.router.navigate(['/ProgramRoleedit/'+ this.selectedId]);
  }
  createProle() {
    this.router.navigate(['/ProgramRoleedit/0']);
  }
}
