import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService
} from 'primeng/api';
import { Table } from 'primeng/table';

import { PaginatorParams } from '@core/models/paginator-params';

import { defaultParams, paramGenerate } from '@shared/utils/helper';

import { FunctionEnum } from '@pages/setup/models/function';
import { User } from '@pages/setup/models/user';
import { UsersService } from '@pages/setup/services/users/users.service';

@Component({
  selector: 'romaneio-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  @ViewChild('table')
  table!: Table;

  public qtdRegistros: number;
  public users: User[];
  public isLoading: boolean;
  public userEdit: User;
  public editModal: boolean;
  public currentUser: User;
  private lastLazyLoad!: LazyLoadEvent;
  private pageParams: PaginatorParams;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.isLoading = false;
    this.qtdRegistros = 0;

    this.users = [];

    this.userEdit = {};

    this.pageParams = defaultParams();

    const userString = localStorage.getItem('currentUser');

    this.currentUser = userString ? (JSON.parse(userString) as User) : {};
    this.editModal = false;
  }

  ngOnInit(): void {
    this.pageParams = defaultParams();
    this.getUsers();
  }

  submitUser(event: User) {
    this.isLoading = true;
    this.usersService.createUser(event).subscribe({
      next: response => {
        this.handleNotification(
          'success',
          'Usuário criado com sucesso',
          `O usuário ${
            response.name ? response.name : ''
          } foi criado com sucesso.`
        );
        this.pageParams = defaultParams();
        this.table.reset();
        this.getUsers();
      },
      error: (error: HttpErrorResponse) => {
        this.handleNotification(
          'error',
          `${error.status} - ${error.statusText}`,
          error.message
        );
        this.isLoading = false;
      }
    });
  }

  editUser(user: User): void {
    this.isLoading = true;
    this.editModal = false;
    this.usersService.putUser(user.id ? user.id : 0, user).subscribe({
      next: () => {
        this.handleNotification(
          'success',
          'Usuário Editado com sucesso',
          undefined
        );
        this.getUsers();
      },
      error: (error: HttpErrorResponse) => {
        this.handleNotification(
          'error',
          `${error.status} - ${error.statusText}`,
          error.message
        );
        this.isLoading = false;
        this.userEdit = {};
      }
    });
  }

  deleteUser(id: number): void {
    this.editModal = false;
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja apagar esse usuário?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.usersService.deleteUser(id).subscribe({
          next: () => {
            this.handleNotification(
              'success',
              'Usuário deletado com sucesso',
              undefined
            );
            this.pageParams = defaultParams();
            this.table.reset();
            this.getUsers();
          },
          error: (error: HttpErrorResponse) => {
            this.handleNotification(
              'error',
              `${error.status} - ${error.statusText}`,
              error.message
            );
            this.isLoading = false;
            this.userEdit = {};
          }
        });
      },
      reject: () => {
        this.closeEditModal();
      }
    });
  }

  onChange(event: LazyLoadEvent): void {
    if (this.lastLazyLoad) {
      if (
        event.first !== undefined &&
        event.rows !== undefined &&
        event.first !== this.lastLazyLoad.first
      ) {
        this.pageParams.page = event.first / event.rows;
      }
      if (event.rows !== this.lastLazyLoad.rows) {
        this.table.first = this.pageParams.page = event.first = 0;
        this.pageParams.size = event.rows;
      }
      if (
        event.sortField !== this.lastLazyLoad.sortField ||
        event.sortOrder !== this.lastLazyLoad.sortOrder
      ) {
        this.pageParams.order = event.sortField;

        if (event.sortOrder === 1) {
          this.pageParams.direction = 'asc';
        }
        if (event.sortOrder === -1) {
          this.pageParams.direction = 'desc';
        }
      }
      this.getUsers();
    }
    this.lastLazyLoad = event;
  }

  openEditModal(user: User): void {
    this.userEdit = { ...user };
    this.editModal = true;
  }

  closeEditModal(): void {
    this.editModal = false;
    this.userEdit = {};
  }

  isDisabledButton(): boolean {
    return (
      this.currentUser.function !== FunctionEnum.ADMINISTRADOR &&
      this.currentUser.function !== FunctionEnum.MASTER
    );
  }

  isDisabled(user: User): boolean {
    const geral =
      (this.currentUser.function !== FunctionEnum.ADMINISTRADOR &&
        this.currentUser.function !== FunctionEnum.MASTER) ||
      user.function === FunctionEnum.MASTER;

    const isAdmin =
      this.currentUser.function === FunctionEnum.ADMINISTRADOR &&
      user.function === FunctionEnum.ADMINISTRADOR &&
      user.nickname !== this.currentUser.nickname;

    return geral || isAdmin;
  }

  getDate(date: string | Date): string {
    return new Date(date).toLocaleString();
  }

  private getUsers(): void {
    this.isLoading = true;
    this.usersService.getAllUser(paramGenerate(this.pageParams)).subscribe({
      next: response => {
        this.users = response.data;
        this.qtdRegistros = response.totalElements;

        if (
          this.table &&
          this.pageParams.page !== undefined &&
          this.pageParams.size !== undefined
        ) {
          this.table.first = this.pageParams.page * this.pageParams.size;
        }

        if (
          this.lastLazyLoad &&
          this.pageParams.page !== undefined &&
          this.pageParams.size !== undefined
        ) {
          this.lastLazyLoad.first = this.pageParams.page * this.pageParams.size;
        }
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.handleNotification(
          'error',
          `${error.status} - ${error.statusText}`,
          error.message
        );
        this.isLoading = false;
      }
    });
  }

  private handleNotification(
    type: 'success' | 'info' | 'warn' | 'error',
    title: string,
    detail: string | undefined
  ): void {
    this.messageService.add({ severity: type, summary: title, detail });
  }
}
