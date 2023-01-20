import { Component } from '@angular/core';

import { ConfirmationService, MenuItem } from 'primeng/api';

import { AuthorizationService } from '@core/services/authorization/authorization.service';

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

  constructor(
    private confirmationService: ConfirmationService,
    private authorizationService: AuthorizationService
  ) {
    const userString = localStorage.getItem('currentUser');

    this.currentUser = userString ? (JSON.parse(userString) as User) : {};

    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard'
      },
      {
        label: 'Pedidos',
        icon: 'pi pi-fw pi-list',
        items: [
          {
            label: 'Criar Pedido',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/orders',
            disabled: true
          },
          {
            label: 'Listar Pedidos',
            icon: 'pi pi-fw pi-list',
            routerLink: '/orders',
            disabled: true
          },
          {
            label: 'Faturamento',
            icon: 'pi pi-fw pi-shopping-bag',
            routerLink: '/orders',
            disabled: true
          },
          {
            label: 'Pedidos Finalizados',
            icon: 'pi pi-fw pi-truck',
            routerLink: '/orders',
            disabled: true
          }
        ]
      },
      {
        label: 'Romaneios',
        icon: 'pi pi-fw pi-table',
        routerLink: '/romaneios'
      },
      {
        label: 'Clientes',
        icon: 'pi pi-fw pi-users',
        routerLink: '/clients'
      },
      {
        label: 'Produtos',
        icon: 'pi pi-fw pi-box',
        routerLink: '/product',
        disabled: this.isDisabled()
      },
      {
        label: 'Configurações',
        icon: 'pi pi-fw pi-wrench',
        routerLink: '/setup',
        disabled: this.isDisabled()
      },
      { separator: true },
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.quit()
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

  private quit() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja sair?',
      header: 'Confirmação de SignOut',
      icon: 'pi pi-fw pi-power-off text-red-600',
      accept: () => {
        this.authorizationService.signOut();
        location.reload();
      }
    });
  }
}
