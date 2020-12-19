import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileHeaderApiService } from '../profileheader-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileHeaderModel } from 'src/app/models/profile-header.model';
import { AgGridAngular } from 'ag-grid-angular';
import * as global from 'src/config';

@Component({
  selector: 'app-profile-header-grid',
  templateUrl: './profile-header-grid.component.html'
})
export class ProfileHeaderGridComponent implements OnInit {
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
  rowData: ProfileHeaderModel;
  temp: any;
  selectedDataStringPresentation;
  defaultColDef: { resizable: boolean; };
  colResizeDefault: string;
  selectedId: number;
  
  constructor(private http: HttpClient,
    private api: ProfileHeaderApiService,
    private router: Router,
    private _route: ActivatedRoute) {
    this.colResizeDefault = 'shift';
    this.defaultColDef = { resizable: true };
    this.rowClassRules = {
      'deleted-row': function (params) {
        var active = params.data.active_flag;
        return active == 'N';
      }
    };
  }
  ngOnInit(): void {
      this.fetchData();
  }
  fetchData() {
      this.api.getApiData().subscribe((data: ProfileHeaderModel) => {
        console.log(data);
        this.temp = data;
        this.rowData = this.temp.message;
      });
  }
  columnDefs = [
    {
      headerName: 'PHM Name', field: 'phm_name', width: 250, sortable: true, filter: true,checkboxSelection:true,
      valueGetter: function (params) {
        if (params.data.phm_name == 'NULL' || params.data.phm_name == null)
          return ' ';
        return params.data.phm_name;
      }
    },
    {
      headerName: 'PHM Level', field: 'phm_level', width: 160, sortable: true, filter: true,
      valueGetter: function (params) {
        if (params.data.phm_level == 'NULL' || params.data.phm_level == null)
          return ' ';
        return params.data.phm_level;
      }
    }
  ];
  onRowDoubleClick() {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // this.selectedId = +selectedNodes.map(node => node.data.story_id);
    // const selectedAppId = selectedNodes.map(node => node.data.app_id);
    // this.router.navigate(['/Storyedit/' + selectedAppId + '/' + this.selectedId], { queryParams: { mode: 'read' } });
  }
  getSelectedRows() {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // const selectedData = selectedNodes.map(node => node.data);
    // this.selectedDataStringPresentation = selectedData.map(node => node.phm_definition_key + ':' + node.question).join(', ');
  }
  onSelectionChanged() {
    // this.getSelectedRows();
    // document.querySelector('#selectedRows').innerHTML = this.selectedDataStringPresentation;
  }

  editProfileHeader() {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // this.selectedId = +selectedNodes.map(node => node.data.story_id);
    // const selectedAppId = selectedNodes.map(node => node.data.app_id);
    // if (this.selectedId === 0)
    //   alert('Please,Select any one row!');
    // else
    //    this.router.navigate(['/Storyedit/' + selectedAppId + '/' + this.selectedId]);
  }
  createProfileHeader() {
    // this.router.navigate(['/Storyedit/0']);
  }
  deleteProfileHeader() {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // this.selectedId = +selectedNodes.map(node => node.data.story_id);
    // if (this.selectedId === 0)
    //   alert('Please,Select any one row!');
    // else {
    //   alert('Deleted id:' + this.selectedId);
    //   this.story_id = this.selectedId;
    //   this.api.deletestory(this.story_id).subscribe(() => {
    //     this.fetchData();
    //     (error: ProfileHeaderModel) => { console.log(error); }
    //   });

    // }
  }
}
