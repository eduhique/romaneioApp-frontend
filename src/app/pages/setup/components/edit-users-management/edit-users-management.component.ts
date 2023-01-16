import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FunctionEnum } from '@pages/setup/models/function';
import { User } from '@pages/setup/models/user';

@Component({
  selector: 'romaneio-edit-users-management',
  templateUrl: './edit-users-management.component.html',
  styleUrls: ['./edit-users-management.component.scss']
})
export class EditUsersManagementComponent {
  @Input()
  public user: User;

  @Input()
  public modal: boolean;

  @Input()
  public trashDisable: boolean;

  @Output()
  public closeModal: EventEmitter<void>;

  @Output()
  public sendUser: EventEmitter<User>;

  @Output()
  public deleteUser: EventEmitter<number>;

  public blockSpace: RegExp;

  constructor() {
    this.modal = false;
    this.closeModal = new EventEmitter<void>();
    this.user = {};
    this.blockSpace = /\S/;
    this.sendUser = new EventEmitter<User>();
    this.trashDisable = false;

    this.deleteUser = new EventEmitter<number>();
  }

  hiddenModal(): void {
    this.closeModal.emit();
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

  isValid(): boolean {
    return (
      this.user.name !== undefined &&
      this.user.nickname !== undefined &&
      this.user.function !== undefined &&
      this.user.active !== undefined &&
      this.user.name.trim().length > 0 &&
      this.user.nickname.trim().length > 0
    );
  }

  submitUser(): void {
    if (this.isValid()) {
      this.user.name = this.user.name?.trim();
      this.user.nickname = this.user.nickname?.trim();
      this.user.password = this.user.password?.trim();

      this.sendUser.emit(this.user);
    }
  }

  radioDisabled(): boolean {
    return this.user.function
      ? this.user.function === FunctionEnum.ADMINISTRADOR
      : false;
  }

  delete() {
    this.deleteUser.emit(this.user.id);
  }
}
