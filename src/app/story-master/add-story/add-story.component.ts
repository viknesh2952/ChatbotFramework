import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StoryApiService } from 'src/app/story-master/storyapi.service'
import { StoryModel, StoryUpdate } from 'src/app/models/story.model';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { MenunameService } from 'src/app/menuname.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AppConfigService } from 'src/app/app-config.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';


const moment = _rollupMoment || _moment;

export interface AppId {
  PRODUCT_CODE: string,
  PRODUCT_KEY: number,
  PRODUCT_NAME: string
  PRODUCT_ACTIVE_FLAG: string,
  PRODUCT_ACTIVE_FROM: string,
  PRODUCT_ACTIVE_TO: string,
  PRODUCT_LOCK_KEY: number,
  PRODUCT_ORDER_BY: number,
  PRODUCT_DEPLOYED_URL: string
}

export interface ModuleId {
  MODULE_ACTIVE_FLAG: string,
  MODULE_ACTIVE_FROM: string,
  MODULE_ACTIVE_TO: string,
  MODULE_APPLICABILITY: string,
  MODULE_CODE: string,
  MODULE_ICON: number,
  MODULE_KEY: number,
  MODULE_LOCK_KEY: number,
  MODULE_NAME: string,
  MODULE_ORDER_BY: number,
  MODULE_PAGE: any,
  MODULE_PARENT_KEY: any,
  MODULE_PASSWORD_REQUIRED: any,
  MODULE_PATH: string,
  MODULE_PREFIX: string,
  MODULE_PRODUCT_KEY: string
}
export interface SubModuleId {
  SUB_APPLICABILITY: string,
  SUB_MODULE_ACTIVE_FLAG: string,
  SUB_MODULE_ACTIVE_TO: string,
  SUB_MODULE_CODE: string,
  SUB_MODULE_ICON: any,
  SUB_MODULE_KEY: number,
  SUB_MODULE_LOCK_KEY: null,
  SUB_MODULE_NAME: string,
  SUB_MODULE_ORDER_BY: number,
  SUB_MODULE_PAGE: null,
  SUB_MODULE_PARENT_KEY: number,
  SUB_MODULE_PATH: null,
  SUB_MODULE_PRODUCT_KEY: string,
  level: null,
  level_code: number,
  level_ind: string
}
export interface Refdetail {
  RCD_ABBREVIATION: string,
  RCD_DETAIL_KEY: number,
  RCD_HEADER_KEY: number,
  RCD_HIGH_RANGE: number,
  RCD_LOCK_KEY: number,
  RCD_LOW_RANGE: number,
  RCD_MEANING: string,
  RCD_ORDER_BY: number,
  RCD_SET_AS_DEFAULT: string,
  RCD_VALUE: string
}
@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  providers: [NgbModal],
  encapsulation: ViewEncapsulation.None,
})
export class AddStoryComponent implements OnInit {
  date = new FormControl(moment());
  today = new Date();
  min = new Date(this.today.setDate(this.today.getDate() - 1));
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('storyform') public createstory: NgForm;
  isSubmitted: boolean = false;
  story: StoryModel;
  panelTitle: string;
  app_id: number = null;
  module_id: number;
  sub_module_id: number;
  question: string[] = [""];
  response = "";
  keywords: string[] = [""];
  applicability: string[] = [""];
  questionset: string[] = [];
  qcount = 0;
  keywordset: string[] = [];
  kcount = 0;
  applicabilityset: string[] = [];
  acount = 0;
  userdata: any;
  temp1: any;
  user_id: any;
  getdata: any;
  update: StoryUpdate;
  message: string;
  readonly: boolean = false;
  disableappid: boolean = false;
  appid: AppId[] = [];
  product = null;
  moduleid: ModuleId[] = [];
  module = null;
  submoduleid: SubModuleId[] = [];
  submodule = null;
  refdetail: Refdetail[] = [];
  ref = null;
  AppCtrl = new FormControl();
  filteredAppId: Observable<AppId[]>;
  ModuleCtrl = new FormControl();
  filteredModuleId: Observable<ModuleId[]>;
  SubModuleCtrl = new FormControl();
  filteredSubModuleId: Observable<SubModuleId[]>;
  RefDetailCtrl = new FormControl();
  filteredRefDetail: Observable<Refdetail[]>;
  demo: {
    message: any,
    status: any
  };
  str: any;
  protected dynamic = AppConfigService.settings;
  global;
  id: number;
  dateString: any;
  expiry;
  expiryvalid: boolean = false;
  expiry_past: boolean = false;
  closeResult = '';
  story_intent: any;
  story_api: any;
  story_params: any;
  Not_output: boolean = false;
  Not_params: boolean = false;
  Not_api: boolean = false;


  constructor(
    private api: StoryApiService,
    private menunameservice: MenunameService,
    private router: Router,
    private _route: ActivatedRoute,
    private location: Location,
    private datepipe: DatePipe,
    private snackBar: MatSnackBar,
    private modalService: NgbModal
  ) {
    this.global = this.dynamic.global;
    var route = '/Story/0';
    this.menunameservice.routeAuth(route);
    this.api.getProduct().subscribe((data: any) => {
      this.demo = data;
      for (let i = 0; i < data.message.length; i++) {
        if (data.message[i].PRODUCT_ACTIVE_FLAG == 'Y') {
          this.appid.push(data.message[i]);
        }
      }
    });
    this._route.paramMap.subscribe(parameterMap => {
      this.id = +parameterMap.get('id');

      this.api.getRefDetail().subscribe((data: any) => {
        for (let i = 0; i < data.message.length; i++) {
          this.refdetail.push(data.message[i]);
          if (data.message[i].RCD_SET_AS_DEFAULT == 'Y' && this.id == 0) {
            this.ref = data.message[i].RCD_ABBREVIATION;
          }
        }
      });
    });

  }

  private _filterAppId(value: any): AppId[] {
    const filterValue = value;
    return this.appid.filter(id => id.PRODUCT_NAME.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterModuleId(value: any): ModuleId[] {
    const filterValue = value;
    return this.moduleid.filter(id => id.MODULE_NAME.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterSubModuleId(value: any): SubModuleId[] {
    const filterValue = value;
    return this.submoduleid.filter(id => id.SUB_MODULE_NAME.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterRefDetail(value: any): Refdetail[] {
    const filterValue = value;
    return this.refdetail.filter(id => id.RCD_ABBREVIATION.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.filteredAppId = this.AppCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterAppId(id) : this.appid.slice())
        );

      this.filteredRefDetail = this.RefDetailCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterRefDetail(id) : this.refdetail.slice())
        );
    }, 2000);
    this.temp1 = JSON.parse(sessionStorage.getItem('user'));
    this.user_id = this.temp1.message[1].user_code;
    this._route.paramMap.subscribe(parameterMap => {
      this.id = +parameterMap.get('id');
      this.app_id = +parameterMap.get('appid');
      this.getStory(this.id);
    });
    //////////
    this.api.getModule(this.app_id).subscribe((data: any) => {
      console.log(data);
      if (data.message == "No Record Found") {
        this.module = 0;
        this.submodule = 0;
      }
      else {
        for (let i = 0; i < data.message.length; i++) {
          this.moduleid.push(data.message[i]);
        }
      }
    });
    setTimeout(() => {
      this.filteredModuleId = this.ModuleCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterModuleId(id) : this.moduleid.slice())
        );
    }, 1000);
    ////////////////
    this._route.queryParams.subscribe(params => {
      this.readonly = (params['mode'] == 'read' ? true : false);
    });
    this.menunameservice.sharedMessage.subscribe(message => this.message = message);
    this.menunameservice.nextMessage(this.panelTitle);
    this.temp1 = JSON.parse(sessionStorage.getItem('user'));
    this.userdata = this.temp1.message;
    this.user_id = this.userdata[0].role_code;
    for (var i = 0; i < 3; i++) {
      this.addQuestion();
      this.addKeyword();
      this.addApplicability();
    }
  }
  callModule(app_id) {
    for (let i = 0; i < this.appid.length; i++) {
      if (app_id == this.appid[i].PRODUCT_NAME) {
        app_id = this.appid[i].PRODUCT_KEY;
        break;
      }
    }
    this.moduleid = [];
    this.api.getModule(app_id).subscribe((data: any) => {
      console.log(data);
      if (data.message == "No Record Found") {
        this.module = 0;
        this.submodule = 0;
      }
      else {
        for (let i = 0; i < data.message.length; i++) {
          this.moduleid.push(data.message[i]);
        }
      }
    });
    setTimeout(() => {
      this.filteredModuleId = this.ModuleCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterModuleId(id) : this.moduleid.slice())
        );
    }, 1000);
  }
  callSubModule(app_id, module_id) {
    for (let i = 0; i < this.appid.length; i++) {
      if (app_id == this.appid[i].PRODUCT_NAME) {
        app_id = this.appid[i].PRODUCT_KEY;
        break;
      }
    }
    for (let i = 0; i < this.moduleid.length; i++) {
      if (module_id == this.moduleid[i].MODULE_NAME) {
        module_id = this.moduleid[i].MODULE_KEY;
        break;
      }
    }
    this.submoduleid = [];
    this.api.getSubModule(app_id, module_id).subscribe((data: any) => {
      console.log(data);
      if (data.message == "No Record Found") {
        this.submodule = 0;
      }
      else {
        for (let i = 0; i < data.message.length; i++) {
          this.submoduleid.push(data.message[i]);
        }
      }
    });
    setTimeout(() => {
      this.filteredSubModuleId = this.SubModuleCtrl.valueChanges
        .pipe(
          startWith(''),
          map(id => id ? this._filterSubModuleId(id) : this.submoduleid.slice())
        );
    }, 1000);
  }
  formatDate(date) {
    return this.datepipe.transform(date, this.global.DATE_FORMAT_OUTPUT);
  }
  ///////////////
  isValidDate(dateString) {
    console.log('.')
    this.dateString = this.formatDate(dateString);
    if (this.dateString == null) {
      this.expiryvalid = false;
    }
    else {
      this.expiryvalid = true;
    }
  }

  chkpastcall() {
    if (this.expiry_past) {
      this.chkpastDate();
      return true;
    }
  }

  chkpastDate() {
    if (this.id == 0) {
      if (this.expiry < this.min) {
        this.expiry_past = true;
      }
      else {
        this.expiry_past = false;
      }
    }
  }
  ///////////////
  test(isvalid: boolean, sform: NgForm) {
    let flag = 0;
    if (this.product == null || this.ref == null || this.story.question[0] == null || this.story.question[0] == '') {
      flag = 1;
    }
    if (this.module == null || this.submodule == null) {
      flag = 1;
    }
    if (this.story.applicability[0] == null || this.story.applicability[0] == '' || this.story.keywords[0] == null || this.story.keywords[0] == '') {
      flag = 1;
    }
    if (this.expiry == null) {
      flag = 1;
      alert('Date is Empty or Invalid');
    }
    if (flag == 1) {
      this.isSubmitted = true;
    }
    if (!this.expiryvalid) {
      this.isValidDate(this.expiry);
    }
    else {
      this.chkpastDate();
    }
    if (!isvalid) {
      // alert('Please fill out the mandatory fields!');
      this.isSubmitted = true;
    }
    if (flag == 0) {
      if (this.expiryvalid) {
        if (this.id == 0) {
          if (!this.expiry_past) {
            this.addtoApi(sform);
            // alert('API');
          }
          else {
            alert('Dont Enter Past Date');
            this.chkpastDate();
          }
        }
        else {
          this.addtoApi(sform);
          // alert('API');
        }
      }
    }
    else {
      alert('Please fill out the mandatory fields');
    }
  }
  addtoApi(sform: NgForm): void {
    if (this.module == null) {
      this.module == Number(0);
    }
    if (this.submodule == null) {
      this.submodule == Number(0);
    }
    for (let i = 0; i < this.appid.length; i++) {
      if (this.product == this.appid[i].PRODUCT_NAME) {
        this.story.app_id = this.appid[i].PRODUCT_KEY;
        break;
      }
    }
    for (let i = 0; i < this.refdetail.length; i++) {
      if (this.ref == this.refdetail[i].RCD_ABBREVIATION) {
        this.story.active = this.refdetail[i].RCD_VALUE;
        break;
      }
    }
    this.story.module_id = Number(this.module);
    for (let i = 0; i < this.moduleid.length; i++) {
      if (this.module == this.moduleid[i].MODULE_NAME) {
        this.story.module_id = this.moduleid[i].MODULE_KEY;
        break;
      }
    }
    if (this.module == 0) {
      this.story.module_id = Number(this.module);
    }
    this.story.sub_module_id = Number(this.submodule);
    for (let i = 0; i < this.submoduleid.length; i++) {
      if (this.submodule == this.submoduleid[i].SUB_MODULE_NAME) {
        this.story.sub_module_id = this.submoduleid[i].SUB_MODULE_KEY;
        break;
      }
    }
    if (this.submodule == 0) {
      this.story.sub_module_id = Number(this.submodule);
    }
    this.story.expiry = this.formatDate(this.expiry);
    if (this.story.story_id == null) {
      console.log(this.story);
      this.api.addstory(this.story).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status == "success") {
            sform.reset();
            this.location.back();
            this.openSnackBar('Record Inserted Successfully!!!');
          }
        },
        (error: StoryModel) => {
          console.log(error);
          this.openSnackBar('Record Not Inserted');
        }
      );
      console.log(this.story);
    }
    else {
      this.update = {
        app_id: this.app_id,
        user_id: this.user_id,
        story_id: this.story.story_id,
        module_id: this.story.module_id,
        sub_module_id: this.story.sub_module_id,
        response: this.story.response,
        active: this.story.active,
        expiry: this.story.expiry,
        reference_url: this.story.reference_url,
        order_by: this.story.order_by,
        intent: this.story.intent,
        entity: this.story.entity,
        keywords: this.story.keywords,
        question: this.story.question,
        applicability: this.story.applicability,
      };
      this.api.updatestory(this.update).subscribe(() => {
        console.log(this.update);
        sform.reset();
        this.location.back();
        this.openSnackBar('Record Updated Successfully!!!');
      },
        (error: StoryUpdate) => {
          console.log(error);
          this.openSnackBar('Record Not Updated!!!');
        }
      );
    }
  }
  private getStory(id: number) {
    if (id === 0) {
      this.story = {
        story_id: null,
        app_id: null,
        user_id: this.user_id,
        module_id: null,
        question: [null],
        response: null,
        keywords: [null],
        active: null,
        activated_by: null,
        expiry: null,
        created_by: this.user_id,
        updated_by: null,
        created_datetime: null,
        sub_module_id: null,
        order_by: null,
        applicability: [null],
        reference_url: null,
        entity: null,
        intent: null
      };
      if (this.app_id != null && this.app_id != 0) {
        this.story.app_id = this.app_id;
        this.disableappid = true;
        console.log(this.appid);
        setTimeout(() => {
          for (let i = 0; i < this.demo.message.length; i++) {
            if (this.story.app_id == this.demo.message[i].PRODUCT_KEY) {
              this.product = this.demo.message[i].PRODUCT_NAME;
              break;
            }
          }
        }, 2000);
      }
      this.panelTitle = 'Add Story';
    }
    else {
      this.api.getStory(id).subscribe(
        (data) => {
          console.log(data);
          this.getdata = data;
          this.story = this.getdata.message[0];
          this.story.app_id = this.app_id;
          this.api.getStoryOutput(this.story.response).subscribe((data: any) => {
            if (data.status == 'failed' || data.message == null || data.message == 'No Record Found') {
              this.Not_output = true;
              this.story_intent.api_variable = '';
              this.story_intent.display_output = '';
              this.story_intent.res_intent = '';
            }
            else {
              this.story_intent = data.message[0];
            }
          });
          this.api.getStoryApi(this.story.response).subscribe((data: any) => {
            if (data.status == 'failed' || data.message == null || data.message == 'No Record Found') {
              this.Not_api = true;
              this.story_api.cas_intent = '';
              this.story_api.cas_sql = '';
              this.story_api.cas_parameter_1 = '';
              this.story_api.cas_parameter_2 = '';
              this.story_api.cas_parameter_3 = '';
              this.story_api.cas_parameter_4 = '';
              this.story_api.cas_parameter_5 = '';
              this.story_api.cas_parameter_6 = '';
            }
            else {
              this.story_api = data.message[0];
            }
          });
          this.api.getStoryParams(2,this.story.response).subscribe((data: any) => {
            if (data.status == 'failed' || data.message == null || data.message == 'No Record Found') {
              this.Not_params = true;
              this.story_params.intent = '';
              this.story_params.PARAMETERNAME = '';
              this.story_params.PARAMETERSQL = '';
            }
            else {
              this.story_params = data.message[0];
            }
          });


          ///////////////////
          for (let i = 0; i < this.refdetail.length; i++) {
            if (this.getdata.message[0].active_flag == this.refdetail[i].RCD_VALUE) {
              this.ref = this.refdetail[i].RCD_ABBREVIATION;
              break;
            }
          }
          ///////////////////
          this.expiry = new Date(this.getdata.message[0].expiry_date);
          setTimeout(() => {
            if (this.story.question != null) {
              this.str = this.story.question;
              // this.str=this.str.split('|');
              this.str = splitMulti(this.str)
              this.story.question = this.str;
            }
            else {
              this.story.question = [null];
            }
            if (this.story.keywords) {
              this.str = this.story.keywords;
              // this.str=this.str.split('|');
              this.str = splitMulti(this.str)
              this.story.keywords = this.str;
            }
            else {
              this.story.keywords = [null];
            }
            if (this.story.applicability) {
              this.str = this.story.applicability;
              // this.str=this.str.split('|');
              this.str = splitMulti(this.str)
              this.story.applicability = this.str;
            }
            else {
              this.story.applicability = [null];
            }
            console.log('------')
            console.log(this.story);

          }, 500);
          function splitMulti(str) {
            var tokens = [',', '|']
            var tempChar = tokens[0]; // We can use the first token as a temporary join character
            for (var i = 1; i < tokens.length; i++) {
              str = str.split(tokens[i]).join(tempChar);
            }
            str = str.split(tempChar);
            return str;
          }

          for (let i = 0; i < this.appid.length; i++) {
            if (this.story.app_id == this.appid[i].PRODUCT_KEY) {
              this.product = this.appid[i].PRODUCT_NAME;
              break;
            }
          }
          for (let i = 0; i < this.refdetail.length; i++) {
            if (this.story.active == this.refdetail[i].RCD_VALUE) {
              this.ref = this.refdetail[i].RCD_ABBREVIATION;
              break;
            }
          }
          this.api.getModule(this.story.app_id).subscribe((data: any) => {
            for (let i = 0; i < data.message.length; i++) {
              if (this.story.module_id == data.message[i].MODULE_KEY) {
                this.module = data.message[i].MODULE_NAME;
                break;
              }
            }
          });
          this.api.getSubModule(this.story.app_id, this.story.module_id).subscribe((data: any) => {
            for (let i = 0; i < data.message.length; i++) {
              if (this.story.sub_module_id == data.message[i].SUB_MODULE_KEY) {
                this.submodule = data.message[i].SUB_MODULE_NAME;
                break;
              }
            }
          });
          /////////////////
          if (this.module == null) {
            this.module = 0;
          }
          if (this.submodule == null) {
            this.submodule = 0;
          }
          //////////////////
        },
        (err: StoryModel) => console.log(err)
      );
      this.panelTitle = 'Edit Story';
    }
  }
  getStoryasparam(param, modal) {
    this.api.getStoryParams(1,param).subscribe((data: any) => {
      if (data.message == 'No Record Found') {
        this.Not_params = true;
        this.story_params.intent = '';
        this.story_params.PARAMETERNAME = '';
        this.story_params.PARAMETERSQL = '';
      }
      else {
        this.Not_params=false;
        this.story_params = data.message[0];
      }
      this.modalService.dismissAll();
      this.open(modal);
    });
  }
  addQuestion() {
    var t = this.qcount++;
    var c = t.toString();
    this.questionset.push(c);
    console.log(this.qcount);
  }
  addKeyword() {
    var t = this.kcount++;
    var c = t.toString();
    this.keywordset.push(c);
    console.log(this.kcount);
  }
  addApplicability() {
    var t = this.acount++;
    var c = t.toString();
    this.applicabilityset.push(c);
    console.log(this.acount);
  }
  removeQuestion(i: number) {
    if (i > 0) {
      console.log(this.questionset);
      this.questionset.splice(i, 1);
      this.story.question.splice(i, 1);
    }
  }

  removeKeyword(i: number) {
    if (i != 0)
      this.keywordset.splice(i, 1);
    this.story.keywords.splice(i, 1);
  }
  removeApplicability(i: number) {
    if (i != 0)
      this.applicabilityset.splice(i, 1);
    this.story.applicability.splice(i, 1);
  }
  back() {
    this.menunameservice.nextMessage('Story Master');
    this.location.back();
  }
  openSnackBar(msg) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  changeEditor(event: EditorChangeContent | EditorChangeSelection) {
    //console.log('values',event);
  }
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1, }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  };

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  updateStoryOutput() {
    this.api.updateStoryOutput(this.story_intent).subscribe(() => {
      this.modalService.dismissAll();
    });
  }
}    
