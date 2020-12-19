import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RefcodesApiService } from '../refcodes-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RefCodesDetail } from 'src/app/models/refcodes.model';
import { AgGridAngular } from 'ag-grid-angular';
import {AppConfigService} from 'src/app/app-config.service';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenunameService } from 'src/app/menuname.service';

@Component({
  selector: 'app-ref-codes-detail-grid',
  templateUrl: './ref-codes-detail-grid.component.html',
  styleUrls: ['./ref-codes-detail-grid.component.css']
})
export class RefCodesDetailGridComponent implements OnInit {
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
  rowData: RefCodesDetail;
  temp: any;
  selectedDataStringPresentation;
  colResizeDefault: string;
  selectedId: number;
  protected dynamic=AppConfigService.settings;
  global;
  header: number;

  constructor(private http: HttpClient,
    private api: RefcodesApiService,
    private menunameservice:MenunameService,
    private router: Router,
    private _route: ActivatedRoute) {
    this.colResizeDefault = 'shift';
    this.menunameservice.routeAuth('/RefCodes');
    this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
    this.rowClassRules = {};
    this.global=this.dynamic.global;
  }
  ngOnInit(): void {
    this._route.paramMap.subscribe(parameterMap => {
      this.header= +parameterMap.get('id');
      this.fetchData(this.header);
    });
  }
  fetchData(id) {
    this.rowData=null;
      this.api.getRefDetail(id).subscribe((data: any) => {
        console.log(data);
        this.temp = data;
        this.rowData = this.temp.message;
      });
  }
  columnDefs = [
     {
      headerName: 'Abbreviation', field: 'RCD_ABBREVIATION', width: 300, sortable: true,  checkboxSelection: true,
      valueGetter: function (params) {
        if (params.data.RCD_ABBREVIATION == null)
          return ' ';
        return params.data.RCD_ABBREVIATION;
      }
    },
    {
      headerName: ' Meaning', field: 'RCD_MEANING', width: 300, sortable: true, 
      valueGetter: function (params) {
        if (params.data.RCD_MEANING == null)
          return ' ';
        return params.data.RCD_MEANING;
      }
    },
    {
      headerName: 'Value', field: 'RCD_VALUE', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.RCD_VALUE == null)
          return ' ';
        return params.data.RCD_VALUE;
      }
    },
    {
      headerName: 'Set As Default', field: 'RCD_SET_AS_DEFAULT', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.RCD_SET_AS_DEFAULT == 'Y')
          return 'Yes';
        if (params.data.RCD_SET_AS_DEFAULT == 'N')
          return 'No';
        return ' ';
      }
    },
    {
      headerName: 'Order By', field: 'RCD_ORDER_BY', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.RCD_ORDER_BY == null)
          return ' ';
        return params.data.RCD_ORDER_BY;
      }
    }
  ];
  onRowDoubleClick(event) {
    var key=event.node.data.RCD_DETAIL_KEY;
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.router.navigate(['/RefCodesDetailedit/'+this.header+'/'+key], { queryParams: { mode: 'read' } });
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.selectedDataStringPresentation = selectedData.map(node => node.RCD_ABBREVIATION);
  }
  onSelectionChanged() {
    this.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML = this.selectedDataStringPresentation;
  }
  editRefDetail() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map(node => node.data.RCD_DETAIL_KEY);
    if (this.selectedId === 0)
      alert('Please,Select any one row!');
    else
       this.router.navigate(['/RefCodesDetailedit/' +this.header+'/'+this.selectedId]);
  }
  createRefDetail() {
    this.router.navigate(['/RefCodesDetailedit/'+this.header+'/0']);
  }
 }
