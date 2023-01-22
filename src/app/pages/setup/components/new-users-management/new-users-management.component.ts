import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FunctionEnum } from '@pages/setup/models/function';
import { User } from '@pages/setup/models/user';

@Component({
  selector: 'romaneio-new-users-management',
  templateUrl: './new-users-management.component.html',
  styleUrls: ['./new-users-management.component.scss']
})
export class NewUsersManagementComponent {
  public modal: boolean;
  public submitted: boolean;
  public user: User;
  public blockSpace: RegExp;

  @Input()
  public disabled: boolean;

  @Output()
  public sendUser: EventEmitter<User>;

  constructor() {
    this.modal = false;
    this.disabled = true;
    this.submitted = false;
    this.user = {};
    this.blockSpace = /\S/;
    this.sendUser = new EventEmitter<User>();
  }

  openModal(): void {
    this.user = { function: FunctionEnum.CONFERENTE, active: true };
    this.submitted = false;
    this.modal = true;
  }

  hiddenModal(): void {
    this.modal = false;
    this.submitted = false;
  }

  getAdmin(): FunctionEnum {
    return FunctionEnum.ADMINISTRADOR;
  }

  getManager(): FunctionEnum {
    return FunctionEnum.GERENTE;
  }

  getConfer(): FunctionEnum {
    return FunctionEnum.CONFERENTE;
  }

  getRegister(): FunctionEnum {
    return FunctionEnum.CAIXA;
  }

  validPassword(): boolean {
    return (
      this.user.password !== undefined && this.user.password.trim().length >= 6
    );
  }

  isValid(): boolean {
    return (
      this.user.name !== undefined &&
      this.user.nickname !== undefined &&
      this.user.function !== undefined &&
      this.user.active !== undefined &&
      this.user.name.trim().length > 0 &&
      this.user.nickname.trim().length > 0 &&
      this.user.active &&
      this.validPassword()
    );
  }

  submitUser(): void {
    this.submitted = true;
    if (this.isValid()) {
      this.user.name = this.user.name?.trim();
      this.user.nickname = this.user.nickname?.trim().toLowerCase();
      this.user.password = this.user.password?.trim();

      this.modal = false;
      this.sendUser.emit(this.user);
      this.user = {};
    }
  }
}
