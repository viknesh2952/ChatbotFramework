import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RefcodesApiService } from '../refcodes-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RefCodesHeader } from 'src/app/models/refcodes.model';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import {AppConfigService} from 'src/app/app-config.service';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenunameService } from 'src/app/menuname.service';

@Component({
  selector: 'app-ref-codes-header-grid',
  templateUrl: './ref-codes-header-grid.component.html',
  styleUrls: ['./ref-codes-header-grid.component.css']
})
export class RefCodesHeaderGridComponent implements OnInit {
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
  rowData: RefCodesHeader;
  temp: any;
  selectedDataStringPresentation;
  colResizeDefault: string;
  selectedId: number;
  protected dynamic=AppConfigService.settings;
  global;

  constructor(private http: HttpClient,
    private api: RefcodesApiService,
    private router: Router,
    private menunameservice:MenunameService,
    private _route: ActivatedRoute,
    private datepipe:DatePipe) {
      this.menunameservice.routeAuth(this.router.url);
    this.colResizeDefault = 'shift';
    this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
    this.rowClassRules = {};
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
      });
  }
  
  columnDefs = [
     {
      headerName: 'Description', field: 'RCH_DESCRIPTION', width: 300, sortable: true,  checkboxSelection: true,
      valueGetter: function (params) {
        if (params.data.RCH_DESCRIPTION == null)
          return ' ';
        return params.data.RCH_DESCRIPTION;
      }
    },
    {
      headerName: ' Domain Name', field: 'RCH_DOMAIN_NAME', width: 400, sortable: true, 
      valueGetter: function (params) {
        if (params.data.RCH_DOMAIN_NAME == null)
          return ' ';
        return params.data.RCH_DOMAIN_NAME;
      }
    },
    {
      headerName: 'Domain Type', field: 'RCH_DOMAIN_TYPE', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.RCH_DOMAIN_TYPE == 'S')
          return 'System';
        if (params.data.RCH_DOMAIN_TYPE == 'U')
          return 'User';
        if (params.data.RCH_DOMAIN_TYPE == null)
          return ' ';
        return params.data.RCH_DOMAIN_TYPE;
      }
    }
  ];
  onRowDoubleClick(event) {
    var key=event.node.data.RCH_HEADER_KEY;
    this.router.navigate(['/RefCodesedit/'+ key], { queryParams: { mode: 'read' } });
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.selectedDataStringPresentation = selectedData.map(node => node.RCH_DESCRIPTION);
  }
  onSelectionChanged() {
    this.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML = this.selectedDataStringPresentation;
  }

  editRefHeader() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map(node => node.data.RCH_HEADER_KEY);
    if (this.selectedId === 0)
      alert('Please,Select any one row!');
    else
       this.router.navigate(['/RefCodesedit/' + this.selectedId]);
  }
  createRefHeader() {
    this.router.navigate(['/RefCodesedit/0']);
  }
 }
