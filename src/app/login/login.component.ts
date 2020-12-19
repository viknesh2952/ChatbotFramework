import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
 

  @Input() loggedin:boolean;
  @Output() loggedinChanged : EventEmitter<boolean>=new EventEmitter();
  hide=true;
  username="";
  password="";
  strDate:Date;
  dateString: any;

  
  constructor(private router:Router,private api: LoginService,private http: HttpClient,
    private _route: ActivatedRoute) { 
  }

  ngOnInit(): void {
      // var url=window.location.href;
  }
  // data1:any=[
  //   {
  //     message: [
  //     {
  //       role_code: "OPERATION"
  //     },
  //     {
  //       user_code: "Premkumar",
  //       user_display_name: "Prem Kumar R",
  //       user_first_name: "Prem Kumar R",
  //       user_key: 7282,
  //       user_last_name: null,
  //       user_middle_name: null
  //     }],
  //   status: "success"
  //  }];

  onSubmit(f: NgForm) {
    ///////////////use it when api not working to access portal
    // var data={
    //   message:[{
    //   last_login:"2020-12-06"
    // },
    // {
    //   user_display_name:"Viknesh"
    // }],
    // last_login_on:"2020-12-06",
    // program_description:[
    //   {
    //     Program_key:101,
    //     Description:"ChatbotContainer"
    //   }
    // ]
    // };
    // var key='user';
    // var value=JSON.stringify(data);
    // sessionStorage.setItem(key,value);
    // var last_login=data.last_login_on;
    // var temp=last_login.split('.');
    // var last_login=temp[0];
    // var value=JSON.stringify(last_login);
    // sessionStorage.setItem('last_login',value);this.loggedin=true;
    // this.loggedinChanged.emit(this.loggedin);
    // this.router.navigate(['Story/0']);
////////////////////
    this.api.Login(f.value.username,f.value.password).subscribe(
      (data) => {console.log(data);
        if(data.status === "success")
        { 
          var key='user';
          var value=JSON.stringify(data);
          sessionStorage.setItem(key,value);
          var last_login=data.last_login_on;
          var temp=last_login.split('.');
          var last_login=temp[0];
          var value=JSON.stringify(last_login);
          sessionStorage.setItem('last_login',value);
          this.loggedin=true;
          this.loggedinChanged.emit(this.loggedin);
          this.router.navigate(['Story/0']);
        }
        if(data.message==="Invalid User ID/Password")
        {
          alert("Incorrect username or password\nPlease Try Again!!!");
        }
      },
      (error: any) => { console.log(error); }
    ); 
  }
}
