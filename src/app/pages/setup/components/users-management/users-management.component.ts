import { Component, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

import { User } from '@pages/setup/models/user';

@Component({
  selector: 'romaneio-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent {
  @ViewChild('table')
  table!: Table;

  public qtdRegistros: number;
  public users: User[];
  public isLoading: boolean;
  private lastLazyLoad!: LazyLoadEvent;

  constructor() {
    this.isLoading = false;
    this.qtdRegistros = 5;
    this.users = [];
  }

  submitUser(event: User) {
    console.log(event);
  }
}
