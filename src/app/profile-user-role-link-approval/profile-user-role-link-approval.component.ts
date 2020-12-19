import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileApiService } from '../profile-master/profileapi.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ProfileModel, ProfileUpdate } from '../models/profile.model';
import { AgGridAngular } from 'ag-grid-angular';
import {AppConfigService} from 'src/app/app-config.service';
import { DatePipe } from '@angular/common';
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
  selector: 'app-profile-user-role-link-approval',
  templateUrl: './profile-user-role-link-approval.component.html'
})
export class ProfileUserRoleLinkApprovalComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  gridOptions = {
    columnDefs: 'columnDefs',
    rowData: 'rowData',
    rowSelection: 'multiple',
    defaultColDef:'defaultColDef',
    colResizeDefault:'colResizeDefault',
    getRowStyle :'getRowStyle'
  };
  public modules: any[] = [
    ClientSideRowModelModule,
    SetFilterModule,
    MenuModule,
    ColumnsToolPanelModule,
  ];
  defaultColDef: { resizable: boolean; filter:string;floatingFilter:boolean;};
  rowData: ProfileModel;
  temp:any;
  selectedDataStringPresentation;
  colResizeDefault: string;
  Profile_id: any;
  selectedkey: number;
  deldata:any;
  selectedName: any[];
  protected dynamic=AppConfigService.settings;
  global;
  selectedId: number;
  profile:ProfileUpdate;
  selectedRows: any[]=[];
  selectedRows1: any[]=[];

   constructor(private http: HttpClient,
    private Profileapi: ProfileApiService,
    private router: Router,
    private menunameservice:MenunameService,
    private _route: ActivatedRoute,
    private datepipe:DatePipe,
    private snackBar: MatSnackBar) 
    {
      this.global=this.dynamic.global;
      this.menunameservice.routeAuth(this.router.url);
      this.colResizeDefault='shift';
      this.defaultColDef = { resizable: true,floatingFilter: true ,filter:'agTextColumnFilter'};
      this.profile={
        uprl_active_from: null,
         uprl_active_status: null,
         uprl_active_to: null,
         uprl_default_printer:null,
         uprl_display_name: null,
         uprl_key: null,
         uprl_landing_program_key:null,
         uprl_profile_key: null,
         uprl_pwd_expire_days: null,
         uprl_pwd_never_expire: null,
         uprl_user_key: null,
         uprl_user_profile_key: null,
         uprl_user_role_key: null
      }
      }
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.rowData=null;
    this.temp=[];
    this.Profileapi.getApiData().subscribe((data:any) => {
      for(let i=0;i<data.message.length;i++){
        if(data.message[i].uprl_active_status=='W'){
          this.temp.push(data.message[i]);
        }
      }      
      this.rowData=this.temp;
      for (let i=0; i < this.temp.length; i++) {
        this.rowData[i].uprl_active_from = this.formatDate(this.rowData[i].uprl_active_from);
        this.rowData[i].uprl_active_to = this.formatDate(this.rowData[i].uprl_active_to);
      }
    });
  }
  columnDefs = [
    {
      headerName: 'Display Name', field: 'uprl_display_name', width: 350, sortable: true,  checkboxSelection:true,
      valueGetter: function (params) {
        if (params.data.uprl_display_name == 'NULL' || params.data.uprl_display_name == null)
          return ' ';
        return params.data.uprl_display_name;
      }
    },
    {
      headerName: 'Active Status', field: 'uprl_active_status', width: 140,sortable: true,  resizable: true,
      valueGetter: function (params) {
        if (params.data.uprl_active_status == 'Y')
          return 'Active';
        if (params.data.uprl_active_status == 'N')
          return 'InActive';
        if (params.data.uprl_active_status == 'W')
          return 'Waiting For Approval';
        return ' ';
      }
    },
    {
      headerName: 'Active from', field: 'uprl_active_from', width: 130,sortable: true, 
      valueGetter: function (params) {
        if (params.data.uprl_active_from == 'NULL' || params.data.uprl_active_from == null)
           return ' ';
        return params.data.uprl_active_from;
      }
    },
    {
      headerName: 'Active To', field: 'uprl_active_to', width: 130, sortable: true, 
      valueGetter: function (params) {
        if (params.data.uprl_active_to == 'NULL' || params.data.uprl_active_to == null)
          return ' ';
        return params.data.uprl_active_to;
      }
    },
    // {
    //   headerName: 'Default Printer', field: 'uprl_default_printer', width: 110, sortable: true, 
    //   valueGetter: function (params) {
    //     if (params.data.uprl_default_printer == 'NULL' || params.data.uprl_default_printer == null)
    //       return ' ';
    //     return params.data.uprl_default_printer;
    //   }
    // },
    {
      headerName: 'PWD Expiry Days', field: 'uprl_pwd_expire_days', width: 160, sortable: true, 
      valueGetter: function (params) {
        if (params.data.uprl_pwd_expire_days == 'NULL' || params.data.uprl_pwd_expire_days == null)
          return ' ';
        return params.data.uprl_pwd_expire_days;
      }
    },
    {
      headerName: 'PWD Never Expire', field: 'uprl_pwd_never_expire', width: 180, sortable: true, 
      valueGetter: function (params) {
        if (params.data.uprl_pwd_never_expire == 'Y')
          return 'Yes';
        return 'No';
        
      }
    }
  ];
  formatDate(date){
    return this.datepipe.transform(date,this.global.DATE_FORMAT_OUTPUT);
  }
  onRowDoubleClick(event){
    var uprl_key=event.node.data.uprl_key;
    var uprl_display_name=event.node.data.uprl_display_name;
    this.router.navigate(['/Profileedit/' + uprl_key],{ queryParams: {name:uprl_display_name,mode: 'read'} });
  }
    getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.selectedDataStringPresentation = selectedData.map(node => node.uprl_display_name + ':' + node.uprl_key).join(', ');

  }
  onSelectionChanged() {
    this.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML = this.selectedDataStringPresentation;
  }
  approve() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedId = +selectedNodes.map(node => node.data.uprl_key);
    this.selectedName = selectedNodes.map(node => node.data.uprl_display_name);
    if (this.selectedId === 0)
      alert('Please,Select any one row!');
    else if(selectedNodes.length>1){
        alert('Select One Record Only!!');
      }
    else {
      this.Profileapi.getProfile(this.selectedId, this.selectedName[0]).subscribe(
        (data:any) => {
          var getdata = data;
          this.profile = getdata.message[0];
          this.profile.uprl_active_status='Y';
        });
      setTimeout(()=>{
        this.Profileapi.updateProfile(this.profile).subscribe((data: any) => {
          if (data.status == "success") {
          this.fetchData();
          console.log(data);
          this.router.navigate(['/ProfileApproval']);
          this.openSnackBar('Profile User Role Approved!!!');
          }
        },
          (error: any) => { console.log(error); 
            this.openSnackBar('Profile User Role Not Approved');
          }
        );
      },2000);      
    }
  }  
  onRowSelected(event) {
    var key = event.node.data.uprl_key;
    var name = event.node.data.uprl_display_name;
    const index: number = this.selectedRows.indexOf(key);
    const index1: number = this.selectedRows1.indexOf(name);
    if (event.node.isSelected()) {
      this.selectedRows.push(key);
      this.selectedRows1.push(name);
    }
    else{
      if (index !== -1) {
          this.selectedRows.splice(index, 1);
      }
      if (index1 !== -1) {
        this.selectedRows1.splice(index1, 1);
    } 
      
    }
    console.log(this.selectedRows);
  }
  reject() {
    if (this.selectedRows.length==0)
      alert('Please,Select any one row!');
    else {
      this.deldata = {
        uprl_key: this.selectedRows
      }     
      var r = confirm("Do you want to delete?\nPlease confirm by clicking 'Ok'");
      if(r==true){
      this.Profileapi.deleteProfile(this.deldata).subscribe(()=> {
      this.fetchData();
      alert('Deleted:'+this.selectedRows1);
      this.selectedRows=[];
      this.selectedRows1=[];
      (error: ProfileModel) => { console.log(error); }
    });
  }
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
