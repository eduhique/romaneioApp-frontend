import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'romaneio-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard'
      }
    ];
  }
}
