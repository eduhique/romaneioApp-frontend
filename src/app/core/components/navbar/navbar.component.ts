import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { FunctionEnum } from '@pages/setup/models/function';
import { User } from '@pages/setup/models/user';

@Component({
  selector: 'romaneio-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public currentUser: User;
  public items: MenuItem[];

  constructor() {
    const userString = localStorage.getItem('currentUser');

    this.currentUser = userString ? (JSON.parse(userString) as User) : {};

    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard'
      },
      {
        label: 'Configurações',
        icon: 'pi pi-fw pi-cog',
        routerLink: '/setup',
        disabled: this.isDisabled()
      }
    ];
  }

  isDisabled(): boolean {
    return (
      this.currentUser.function !== undefined &&
      !(
        this.currentUser.function === FunctionEnum.ADMINISTRADOR ||
        this.currentUser.function === FunctionEnum.MASTER ||
        this.currentUser.function === FunctionEnum.GERENTE
      )
    );
  }
}
