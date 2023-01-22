import { Component } from '@angular/core';

import { FunctionEnum } from '@pages/setup/models/function';
import { User } from '@pages/setup/models/user';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public currentUser: User;

  constructor() {
    const userString = localStorage.getItem('currentUser');

    this.currentUser = userString ? (JSON.parse(userString) as User) : {};
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

  isDisabledOrder() {
    return this.currentUser.function === FunctionEnum.CAIXA;
  }
}
