import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute}from '@angular/router';
import { ConfigApiService } from 'src/app/Configapi.service';
import {ConfigModel} from 'src/app/models/config.model';
//import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
@Component({
  selector: 'app-add-config',
  templateUrl: './add-config.component.html',
  //styleUrls: ['./add-role.component.scss']
})
export class addConfigComponent implements OnInit {
  @ViewChild('config') public createconfig: NgForm;
    config:ConfigModel;
    panelTitle: string;
    app_id=""
    config_name=""
    config_value=""
    config_order=""
    configdata: any;
    update:ConfigModel;
    readonly:boolean=false;
    
    getdata: any;
    constructor(private api:ConfigApiService,
                private router:Router,
                private _route:ActivatedRoute) { }
    
      ngOnInit(): void {
        this._route.paramMap.subscribe(parameterMap => {
          const id = +parameterMap.get('id');
          this.getConfig(id);
        });
      //   this.temp1=JSON.parse(sessionStorage.getItem('role'));
      //  this.userdata=this.temp1.message;
      //  this.userid=this.userdata[0].role_code;
      }
     addtoApi(sform:NgForm):void{

      this.api.addconfig(this.config).subscribe((data:any) => {
        console.log(data);
        sform.reset();
        this.router.navigate(['Config']);
      },
      (error: ConfigModel) => { console.log(error); }
    );
      //   if (this.config.app_id == null) {
      //   this.api.addconfig(this.config).subscribe(
      //     (data:ConfigModel) => {
      //       console.log(data);
      //       sform.reset();
      //       this.router.navigate(['config',0]);
      //     },
      //     (error: ConfigModel) => { console.log(error); }
      //   );
      // } else {
      //     // this.update = {
      //     //   app_id: this.app_id,
      //     //   config_name: this.config_name,
      //     //   config_value: this.config_value,
      //     //   config_order: this.config_order,
      //     // };
      //   this.api.updateconfig(this.config).subscribe(() => {
      //     console.log(this.update);
      //     sform.reset();
      //       this.router.navigate(['config' ,this.app_id]);
      //     },
      //     (error: ConfigModel) => { console.log(error); }
      //   );
      // } 
      }
      private getConfig(id: number) {
          if (id === 0) {
          this.config = {
              app_id:null,
              config_name:null,
              config_value:null,
              config_order:null
            };
          this.panelTitle = 'Add config';
        }
        else {
          this.api.getConfig(id).subscribe(
            (config) => { this.config = config;
            console.log(this.config) 
          },
            (err: ConfigModel) => console.log(err)
          );
          this.panelTitle = 'Edit config';
        }
      }
       back() {
         this.router.navigate(['config']);
       }
      
      
}
    
