import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
  title = 'ChatbotAdminPortal';
  login=false;
  loggedinHandler(loggedin:boolean){
    this.login=loggedin;
  }
}

