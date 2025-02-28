import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

interface SideNavToggle {
  screenWidth : number;
  collapsed: boolean;
  }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tresorerie-srh';
  showSidebar: boolean = true;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is not the login page
        this.showSidebar = !event.url.includes('/login');
      }
    });
  }

  isSideNavCollapsed = false;

  screenWidth= 0;

  onToggleSideNav(data : SideNavToggle ) : void {

    this.screenWidth= data.screenWidth;
    this.isSideNavCollapsed= data.collapsed;
  }
}
