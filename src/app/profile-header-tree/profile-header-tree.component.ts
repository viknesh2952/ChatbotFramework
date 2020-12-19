import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { ProfiletreeModel } from 'src/app/models/profile-tree.model'
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileTreeapiService } from 'src/app/profile-header-tree/service/profile-treeapi.service';
import { Observable } from 'rxjs';






@Component({
    selector: 'app-profile-header-tree',
    templateUrl:'./profile-header-tree.component.html'


})
export class ProfileHeaderTreeComponent implements OnInit {
  [x: string]: any;
  public rootData: Observable<ProfiletreeModel[]>;
  private serviceUrl = 'https://aistore.tvslsl.in:5002/api/v1/get_profile_hierarchy_detail_tree_order';
  app_id: number;
  temp: ProfiletreeModel;
  rowData: any;

    constructor(private http: HttpClient,
      private treeapi:ProfileTreeapiService ,
      private _route: ActivatedRoute,
      private router: Router,) {}
      ngOnInit(): void {
        this.rootData = this.query();
        this._route.paramMap.subscribe((parameterMap) => {
          this.app_id = +parameterMap.get('appid');
          this.fetchData();
        });
      }
      fetchData() {
        //if (this.app_id == 0){
        this.treeapi.getApiData().subscribe((data: ProfiletreeModel) => {
          console.log(data);
          this.temp = data;
          this.rowData = this.temp.message;

        });
        // }
      }

    // public ngOnInit(): void {
    //     this.rootData = this.query();
    // }
///////////////Commented////////////////
    // public fetchChildren = (item: ProfiletreeModel): Observable<ProfiletreeModel[]> => {
        // return this.query(item.level);
    // }
/////////////////////////////////////////

    public hasChildren = (item: ProfiletreeModel): boolean => {
        return item.hasChildren;
    }

    public query(level: number = null): Observable<ProfiletreeModel[]> {
        return this.http.jsonp<ProfiletreeModel[]>(
            `${this.serviceUrl}?level=${level}`,
            'callback'
        );
    }
    createDetail(){}
    editDetail(){}
    deleteDetail(){}
}

