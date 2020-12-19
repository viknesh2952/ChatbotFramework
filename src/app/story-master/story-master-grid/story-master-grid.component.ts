import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoryApiService } from 'src/app/story-master/storyapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryModel } from 'src/app/models/story.model';
import { AgGridAngular } from 'ag-grid-angular';
import {AppConfigService} from 'src/app/app-config.service';
import { DatePipe } from '@angular/common';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenunameService } from 'src/app/menuname.service';

@Component({
  selector: 'app-story-master-grid',
  templateUrl: './story-master-grid.component.html'
})
export class StoryMasterGridComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  gridOptions = {
    columnDefs: 'columnDefs',
    rowData: 'rowData',
    rowSelection: 'multiple',
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
  temp:any=[];
  temp1:string[]=[];
  rowData: any;  
  selectedDataStringPresentation;
  colResizeDefault: string;
  story_id: any;
  app_id: number;
  selectedId: number;
  protected dynamic=AppConfigService.settings;
  global;
  selectedRows: any[]=[];

  
  constructor(private http: HttpClient,
    private Storyapi: StoryApiService,
    private router: Router,
    private menunameservice:MenunameService,
    private _route: ActivatedRoute,
    private datepipe:DatePipe) {
      this.global=this.dynamic.global;
      var route='/Story/0';
      this.menunameservice.routeAuth(route);
    this.colResizeDefault = 'shift';
    this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
    this.rowClassRules = {
      'deleted-row': function (params) {
        var active = params.data.active_flag;
        return active == 'N';
      },
      'waiting-for-approval':function (params) {
        var active = params.data.active_flag;
        return active == 'W';
      }
    };
  }
  ngOnInit(): void {
    this._route.paramMap.subscribe(parameterMap => {
      this.app_id = +parameterMap.get('appid');
      this.fetchData();
    });
  }
  fetchData() {
    if (this.app_id == 0) {
      this.Storyapi.getApiData().subscribe((data: StoryModel) => {
        console.log(data);
        this.temp = data;
        this.rowData = this.temp.message;
        for(let i=0;i<this.rowData.length;i++){
          this.rowData[i].expiry_date=this.formatDate(this.rowData[i].expiry_date);
        }
      });
      
    }
    else
      this.fetchSubstory();      
  }
  fetchSubstory() {
    this.Storyapi.getApiData().subscribe((data: any) => {
         console.log(data);
         this.temp1=[];
      for(let i=0;i<data.message.length;i++){
        if(data.message[i].app_id==this.app_id)
        {
          this.temp1.push(data.message[i]);
        }
      }
      this.rowData = this.temp1;
      for(let i=0;i<data.message.length;i++){
        this.rowData[i].expiry_date=this.formatDate(this.rowData[i].expiry_date);
      }

    });

  }
  formatDate(date){
    return this.datepipe.transform(date,this.global.DATE_FORMAT_OUTPUT);
  }
  columnDefs = [
    // { headerName: 'App_Id', field: 'app_id', sortable: true,  checkboxSelection: true },
    {
      headerName: 'Module_Id', field: 'module_id', width: 120, sortable: true,  
      checkboxSelection: function (params) {
        if (params.data.active_flag == 'Y' || params.data.active_flag=='W' ||params.data.active=='Y' || params.data.active=='W')
          return true;
        return false;
      },
      valueGetter: function (params) {
        if (params.data.module_id == 'NULL' || params.data.module_id == null)
          return ' ';
        return params.data.module_id;
      }
    },
    {
      headerName: 'Question', field: 'question', sortable: true,  resizable: true,
      valueGetter: function (params) {
        if (params.data.question == 'NULL' || params.data.question == null)
          return ' ';
        return params.data.question;
      }
    },
    {
      headerName: 'Response', field: 'response', sortable: true, 
      valueGetter: function (params) {
        if (params.data.response == 'NULL' || params.data.response == null)
           return ' ';
        return params.data.response ? String(params.data.response).replace(/<[^>]+>/gm, '') : '';

      }
    },
    {
      headerName: 'Keyword', field: 'keywords', width: 130, sortable: true, 
      valueGetter: function (params) {
        if (params.data.keywords == 'NULL' || params.data.keywords == null)
          return ' ';
        return params.data.keywords;
      }
    },
    {
      headerName: 'Order By', field: 'order_by', width: 110, sortable: true, 
      valueGetter: function (params) {
        if (params.data.order_by == 'NULL' || params.data.order_by == null)
          return ' ';
        return params.data.order_by;
      }
    },
    {
      headerName: 'Active Status', field: 'active_flag', width: 125, sortable: true, 
      valueGetter: function (params) {
        if (params.data.active_flag == 'Y')
          return 'Active';
        if (params.data.active_flag == 'N')
          return 'InActive';
        if (params.data.active_flag == 'W')
          return 'Waiting for Approval';
        return ' ';
      }
    },
    {
      headerName: 'Activated By', field: 'activated_by', width: 130, sortable: true, 
      valueGetter: function (params) {
        if (params.data.activated_by == 'NULL' || params.data.activated_by == null)
          return ' ';
        return params.data.activated_by;
      }
    },
    {
      headerName: 'SubModule_id', field: 'sub_module_id', width: 140, sortable: true, 
      valueGetter: function (params) {
        if (params.data.sub_module_id == 'NULL' || params.data.sub_module_id == null)
          return ' ';
        return params.data.sub_module_id;
      }
    },
    {
      headerName: 'Applicability', field: 'applicability', width: 130, sortable: true, 
      valueGetter: function (params) {
        if (params.data.applicability == 'NULL' || params.data.applicability == null)
          return ' ';
        return params.data.applicability;
      }
    },
    {
      headerName: 'Reference URL', field: 'reference_url', width: 150, sortable: true, 
      valueGetter: function (params) {
        if (params.data.reference_url == 'NULL' || params.data.reference_url == null)
          return ' ';
        return params.data.reference_url;
      }
    },
    {
      headerName: 'Expiry Date', field: 'expiry_date', width: 130, sortable: true, 
      valueGetter: function (params) {
        if (params.data.expiry_date == 'NULL' || params.data.expiry_date == null)
          return ' ';
        return params.data.expiry_date;
      }
    },
    {
      headerName: 'Created By', field: 'created_by', width: 125, sortable: true, 
      valueGetter: function (params) {
        if (params.data.created_by == 'NULL' || params.data.created_by == null)
          return ' ';
        return params.data.created_by;
      }
    },
    // { headerName: 'Updated By', field: 'updated_by', sortable: true, filter: true },
    {
      headerName: 'Created Time', field: 'created_time', width: 150, sortable: true, 
      valueGetter: function (params) {
        if (params.data.created_time == 'NULL' || params.data.created_time == null)
          return ' ';
        return params.data.created_time;
      }
    },
    {
      headerName: 'Intent', field: 'intent', width: 250, sortable: true, 
      valueGetter: function (params) {
        if (params.data.intent == 'NULL' || params.data.intent == null)
          return ' ';
        return params.data.intent;
      }
    }
  ];
  onRowDoubleClick(event) {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // this.selectedId = +selectedNodes.map(node => node.data.story_id);
    // const selectedAppId = selectedNodes.map(node => node.data.app_id);
    var story_id=event.node.data.story_id;
    var app_id=event.node.data.app_id;
    this.router.navigate(['/Storyedit/' + app_id + '/' + story_id], { queryParams: { mode: 'read' } });    
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.selectedDataStringPresentation = selectedData.map(node => node.module_id + ':' + node.question.split('|')[0]).join(', ');
  }
  onSelectionChanged() {
    this.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML = this.selectedDataStringPresentation;
  }

  editStory() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map(node => node.data.story_id);
    const selectedAppId = selectedNodes.map(node => node.data.app_id);
    if (this.selectedId === 0)
      alert('Please,Select any one row!');
    else if(selectedNodes.length>1){
        alert('Select One Record Only!!');
    }
    else
       this.router.navigate(['/Storyedit/' + selectedAppId + '/' + this.selectedId]);
  }
  createStory() {
    this.router.navigate(['/Storyedit/'+this.app_id+'/0']);
  }
  onRowSelected(event) {
    var key = event.node.data.story_id;
    const index: number = this.selectedRows.indexOf(key);
    if (event.node.isSelected()) {
      this.selectedRows.push(key);
    }
    else{
      if (index !== -1) {
          this.selectedRows.splice(index, 1);
      }
    }
    console.log(this.selectedRows);
  }
    deleteStory() {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // this.selectedId = +selectedNodes.map(node => node.data.story_id);
    if (this.selectedRows.length==0)
      alert('Please,Select any one row!');
    else {
      var r = confirm("Do you want to delete?\nPlease confirm by clicking 'Ok'");
      if(r==true){
      alert('Deleted id:' + this.selectedRows);
      this.Storyapi.deletestory(this.selectedRows).subscribe(() => {
        this.fetchData();
        this.selectedRows=[];
        (error: StoryModel) => { console.log(error); }
      });
    }

    }
  }
}
