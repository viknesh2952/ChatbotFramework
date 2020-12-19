import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoryApiService } from '../story-master/storyapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {AppConfigService} from 'src/app/app-config.service';
import { StoryModel, StoryUpdate } from '../models/story.model';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MenunameService } from '../menuname.service';

@Component({
  selector: 'app-story-approval',
  templateUrl: './story-approval.component.html'
})
export class StoryApprovalComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
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
  temp: any = [];
  rowData: any;
  selectedDataStringPresentation;
  colResizeDefault: string;
  product_id: any;
  selectedId: number;
  story_id: number;
  story: any;
  update:StoryUpdate;
  protected dynamic=AppConfigService.settings;
  global;
  selectedRows: any[]=[];

  // update:{
  //        app_id:number,
  //        user_id:string,
  //        story_id:number,
  //        module_id:number,
  //        sub_module_id:number,
  //        response:string,
  //        active:string,
  //        expiry:string,
  //        keywords:Array<string>,
  //        question:Array<string>,
  //        applicability:Array<string>
  // };
  constructor(private http: HttpClient,
    private api: StoryApiService,
    private router: Router,
    private _route: ActivatedRoute,
    private menunameservice:MenunameService,
    private datepipe: DatePipe,
    private location: Location,
    private snackBar: MatSnackBar
  ) {
    this.global=this.dynamic.global;
    this.menunameservice.routeAuth(this.router.url);
    this.colResizeDefault = 'shift';
    this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
    this.update = {
           app_id:null,
           user_id:null,
           story_id:null,
           module_id:null,
           sub_module_id:null,
           response:null,
           active:null,
           expiry:null,
           keywords:[null],
           question:[null],
           applicability:[null],
           order_by:null,
           reference_url:null,
           entity:null,
           intent:null
    };
  }
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.rowData=null;
    this.temp=[];
    this.api.getApiData().subscribe((data: any) => {
      for (let i = 0; i < data.message.length; i++) {
        if (data.message[i].active_flag == "W") {
          this.temp.push(data.message[i]);
        }
      }
      this.rowData = this.temp;
      for(let i=0;i<this.rowData.length;i++){
        this.rowData[i].expiry_date=this.formatDate(this.rowData[i].expiry_date);
      }      
      console.log(this.rowData);
    });
  }
  columnDefs = [
    // { headerName: 'App_Id', field: 'app_id', sortable: true,  checkboxSelection: true },
    {
      headerName: 'Module_Id', field: 'module_id', width: 120, sortable: true, 
      checkboxSelection: true,
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
    }
  ];
  onRowDoubleClick(event) {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // this.selectedId = +selectedNodes.map(node => node.data.story_id);
    // const selectedAppId = selectedNodes.map(node => node.data.app_id);
    var app_id=event.node.data.app_id;
    var story_id=event.node.data.story_id;
    this.router.navigate(['/Storyedit/' + app_id + '/' + story_id], { queryParams: { mode: 'read' } });
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.selectedDataStringPresentation = selectedData.map(node => node.story_id + ':' + node.question).join(', ');
  }
  onSelectionChanged() {
    this.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML = this.selectedDataStringPresentation;
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
    reject() {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // this.selectedId = +selectedNodes.map(node => node.data.story_id);
    if (this.selectedRows.length==0)
      alert('Please,Select any one row!');
    else {
      var r = confirm("Do you want to delete?\nPlease confirm by clicking 'Ok'");
      if(r==true){
      alert('Deleted id:' + this.selectedRows);
      this.api.deletestory(this.selectedRows).subscribe(() => {
        this.openSnackBar('Story Rejected !!!');
        this.fetchData();
        this.selectedRows=[];
        (error: StoryModel) => { console.log(error); }
      });
    }
    }
  }
  formatDate(date) {
    return this.datepipe.transform(date, this.global.DATE_FORMAT_OUTPUT);
  }
  //////////////////////////

  approve() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map(node => node.data.story_id);
    if (this.selectedId === 0)
      alert('Please,Select any one row!');
    else if(selectedNodes.length>1){
        alert('Select One Record Only!!');
    }
    else {
      this.story_id = this.selectedId;
      this.api.getStory(this.story_id).subscribe((data: any) => {
        this.story= data.message;
        // this.update = this.story[0];
         var str=this.story[0].keywords;
         str=str.split('|');      
         var str1=this.story[0].question;
         str1=str1.split('|');      
         var str2=this.story[0].applicability;
         str2=str2.split('|');      
        this.update= {
          app_id: this.story[0].app_id,
          user_id: this.story[0].updated_by,
          story_id: this.story[0].story_id,
          module_id: this.story[0].module_id,
          sub_module_id: this.story[0].sub_module_id,
          response: this.story[0].response,
          order_by:this.story[0].order_by,
          entity:this.story[0].entity,
          intent:this.story[0].intent,
          reference_url:this.story[0].reference_url,
          active: 'Y',
          expiry: this.formatDate(this.story[0].expiry_date),
          keywords: str,
          question: str1,
          applicability: str2,
        }
        console.log(this.update);
      });
      
      setTimeout(()=>{
        this.api.updatestory(this.update).subscribe((data:any) => {
          this.fetchData();
          console.log(data);
          this.router.navigate(['/StoryApproval']);
          this.openSnackBar('Story Approved!!!');
        },
          (error: any) => { console.log(error); }
        );
      },2000);
      
    }
  }
  openSnackBar(msg) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}