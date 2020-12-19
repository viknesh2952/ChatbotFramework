import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MenunameService } from '../menuname.service';
import { LoginService } from '../login.service';
import { DatePipe } from '@angular/common';
import { AppConfigService } from 'src/app/app-config.service';
export interface MenuItem {
  label: string;
  icon: string;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  @HostListener('window:beforeunload', ['$event'])

  protected dynamic = AppConfigService.settings;
  global;
  open: boolean = true;
  message: string = 'Story Master';
  date: string;
  refmenu: any;
  dynamic_menu_data: any[];
  temp1 = JSON.parse(sessionStorage.getItem('user'));
  userdata = this.temp1.message;
  username = this.userdata[1].user_display_name;
  session_id = this.temp1.user_session_key;
  last_login = JSON.parse(sessionStorage.getItem('last_login'));
  storymenu:any[]=[];
  dynamic_route: any[]=[];
  showSubmenu3: boolean;
  isExpanded3: boolean;
  isShowing3: boolean;
  constructor(private router: Router,
    private menunameservice: MenunameService,
    private api: LoginService,
    private datepipe: DatePipe) {
    this.global = this.dynamic.global;
    this.dynamic_menu_data = this.temp1.program_description;
    for (let i = 0; i < this.dynamic_menu_data.length; i++) {
      this.dynamic_menu_data[i].Program_key = this.parseRoute(this.dynamic_menu_data[i].Program_key);
    }
    for(let j=0;j<this.dynamic_menu_data.length;j++){
      this.dynamic_route.push(this.dynamic_menu_data[j].Program_key);
    }
    this.menunameservice.setMenuList(this.dynamic_route);
}
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  isExpanded1 = false;
  showSubmenu1: boolean = false;
  isShowing1 = false;
  parseRoute(Program: number) {
    if (Program == 101) {
      var route = '/User';
      return route;
    }
    if (Program == 102) {
      var route = '/Role';
      return route;
    }
    if (Program == 103) {
      var route = '/Product';
      return route;
    }
    if (Program == 104) {
      var route = '/Story/0';
      return route;
    }
    if (Program == 105) {
      var route = '/StoryApproval';
      return route;
    }
    if (Program == 106) {
      var route = '/Module';
      return route;
    }
    if (Program == 107) {
      var route = '/ModuleGroup';
      return route;
    }
    if (Program == 108) {
      var route = '/Program';
      return route;
    }
    if (Program == 109) {
      var route = '/ProgramRole';
      return route;
    }
    if (Program == 110) {
      var route = '/Submodule';
      return route;
    }
    if (Program == 111) {
      var route = '/ProfileHeader';
      return route;
    }
    if (Program == 112) {
      var route = '/Profile-Tree';
      return route;
    }
    if (Program == 113) {
      var route = '/RefCodes';
      return route;
    }
    if (Program == 114) {
      var route = '/Profile';
      return route;
    }
    if (Program == 115) {
      var route = '/Config';
      return route;
    }
    if (Program == 116) {
      var route = '/UserSession';
      return route;
    }
    if (Program == 117) {
      var route = '/ProductApproval';
      return route;
    }
    if (Program == 118) {
      var route = '/ModuleGroupApproval';
      return route;
    }
    if (Program == 119) {
      var route = '/ProfileApproval';
      return route;
    }
  }
  show(route: any) {
    if (route == '/Story/0') {
      this.showSubmenu = !this.showSubmenu;
      this.isExpanded = !this.isExpanded;
      this.isShowing = !this.isShowing;
    }
    if (route == '/RefCodes') {
      this.showSubmenu1 = !this.showSubmenu1;
      this.isExpanded1 = !this.isExpanded1;
      this.isShowing1 = !this.isShowing1;
    }
    if (route == 3) {
      this.showSubmenu3 = !this.showSubmenu3;
      this.isExpanded3 = !this.isExpanded3;
      this.isShowing3 = !this.isShowing3;
    }
  }
  formatDate(date) {
    return this.datepipe.transform(date, this.global.DATE_FORMAT_OUTPUT);
  }
  ngOnInit(): void {
    this.menunameservice.sharedMessage.subscribe(message => this.message = message);
    this.storyMenu();
    this.refcodesMenu();
    //slint:disable-next-line:only-arrow-functions typedef
  //   window.addEventListener('beforeunload', (event) => {
  //     this.logout('Logout');
  //   });
  }
  menuItems: MenuItem[] = [
    {
      label: 'Last Login on:' + this.last_login,
      icon: 'calendar_today',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: this.username,
      icon: 'account_circle',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Logout',
      icon: 'logout',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    }
  ];

  logout(item) {
    if (item == 'Logout') {
      this.api.Logout(this.session_id).subscribe(
        (data: any) => {
          if (data.status == "success") {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('last_login');
            location.replace(this.global.DOMAIN + '/' + this.global.PROJECT_NAME);
          }
        });
    }
  }
  public storyMenu() {
    this.api.getStoryMenu().subscribe((data: any) => {
      for(let i=0;i<data.message.length;i++){
        if(data.message[i].PRODUCT_ACTIVE_FLAG=='Y'){
          this.storymenu.push(data.message[i]);
        }
      }
      
    });
  }
  public refcodesMenu() {
    this.api.getRefMenu().subscribe((data: any) => {
      this.refmenu = data.message;
    });
  }
  nav(name, id) {
    this.message = name;
    this.router.navigate(['/Story/' + id]);
  }
  nav1(name, id) {
    this.message = name;
    this.router.navigate(['/RefCodesDetail/' + id]);
  }
  nav2(name, id) {
    this.message = name;
    this.router.navigate(['/ChatbotContainer/' + id]);
  }
}



