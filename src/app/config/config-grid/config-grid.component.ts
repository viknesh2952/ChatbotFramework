import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigApiService } from 'src/app/Configapi.service';
import { Router } from '@angular/router';
import { ConfigModel } from 'src/app/models/config.model';
import { AgGridAngular } from 'ag-grid-angular';
 
@Component({
  selector: 'app-Config',
  templateUrl: './config-grid.component.html',
  })
export class ConfigComponent implements OnInit {
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
  rowData: ConfigModel;
  temp:any;
  selectedDataStringPresentation;
  defaultColDef: { resizable: boolean; };
  colResizeDefault: string;
  selectedId: number;
  user_id: any;

  constructor(private http: HttpClient,
    private configapi: ConfigApiService,
    private router: Router) {
      this.colResizeDefault='shift';
      this.defaultColDef = { resizable: true };
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
    this.configapi.getApiData().subscribe((data: ConfigModel) => {
      console.log(data);
      this.temp=data;
        this.rowData=this.temp.message;

    });
  }
   columnDefs = [
     { headerName: 'App id', field: 'app_id', width:120, sortable: true, filter: true, checkboxSelection:true,
     valueGetter: function(params) {
      if(params.data.app_id=='NULL'||params.data.app_id==null)
        return ' ';
      return params.data.app_id;
     }
    },
     { headerName: 'Config Name',field:'config_name', sortable: true, filter: true,
     valueGetter: function(params) {
      if(params.data.config_name=='NULL'||params.data.config_name==null)
        return ' ';
      return params.data.config_name;
    } },
     { headerName: 'Config Value', field: 'config_value', sortable: true, filter: true,
     valueGetter: function(params) {
      if(params.data.config_value=='NULL'||params.data.config_value==null)
        return ' ';
      return params.data.config_value;
    } },
     { headerName: 'Config Order', field: 'config_order', sortable: true, filter: true,
     valueGetter: function(params) {
      if(params.data.config_order=='NULL'||params.data.config_order==null)
        return ' ';
      return params.data.config_order;
    } },
  
  ];
 
  onRowDoubleClick(){
    
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      this.selectedId = +selectedNodes.map(node => node.data.app_id);
      const selectedAppId = selectedNodes.map(node => node.data.app_id);
      this.router.navigate(['/configedit/' + selectedAppId + '/' + this.selectedId], { queryParams: { mode: 'read' } });
  
    }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.selectedDataStringPresentation = selectedData.map(node => node.config_name + ':' + node.config_order).join(', ');

  }
  onSelectionChanged() {
    this.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML = this.selectedDataStringPresentation;
  }

  editconfig() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map(node => node.data.app_id);
    const selectedAppId = selectedNodes.map(node => node.data.app_id);
    if (this.selectedId === 0)
      alert('Please,Select any one row!');
    else
       this.router.navigate(['/configedit/' + selectedAppId + '/' + this.selectedId]);
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // const selectedId = selectedNodes.map(node => node.data.app_id);
    // const selectedconfigname = selectedNodes.map(node => node.data.app_id);
    // this.router.navigate(['/Configedit/'+ selectedconfigname + '/' + selectedId]);

  }
  createconfig() {
    this.router.navigate(['/configedit/0']);
  }
  back() {
    this.router.navigate(['config/0']);
  }
 
}
