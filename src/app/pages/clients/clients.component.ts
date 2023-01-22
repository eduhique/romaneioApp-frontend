import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash-es';

import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService
} from 'primeng/api';
import { Table } from 'primeng/table';

import { PaginatorParams } from '@core/models/paginator-params';

import { defaultParams, paramGenerate } from '@shared/utils/helper';

import { Client } from '@pages/clients/models/client';
import { ClientType } from '@pages/clients/models/client-type';
import { ClientsService } from '@pages/clients/services/clients/clients.service';
import { FunctionEnum } from '@pages/setup/models/function';
import { User } from '@pages/setup/models/user';

@Component({
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @ViewChild('table')
  table!: Table;

  public qtdRegistros: number;
  public clients: Client[];
  public isLoading: boolean;
  public client: Client;
  public modal: boolean;
  public currentUser: User;
  public actionLabel: string;
  private lastLazyLoad!: LazyLoadEvent;
  private pageParams: PaginatorParams;

  constructor(
    private apiService: ClientsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.actionLabel = 'Novo Cliente';

    this.isLoading = false;
    this.qtdRegistros = 0;

    this.clients = [];

    this.client = {};

    this.pageParams = defaultParams();
    this.pageParams.size = 6;

    this.modal = false;

    const userString = localStorage.getItem('currentUser');

    this.currentUser = userString ? (JSON.parse(userString) as User) : {};
  }

  ngOnInit(): void {
    this.pageParams = defaultParams();
    this.pageParams.size = 6;
    this.getData();
  }

  openModal() {
    this.actionLabel = `Novo Cliente`;
    this.client = { clientType: ClientType.VAREJO };
    this.modal = true;
  }

  openEditModal(client1: Client): void {
    this.actionLabel = `Editar ${client1.name ? client1.name : ''}`;
    this.client = cloneDeep<Client>(client1);
    this.modal = true;
  }

  closeEditModal(): void {
    this.modal = false;
    this.client = {};
  }

  verifySubmit(event: Client) {
    this.modal = false;
    if (event.id === undefined) {
      this.submitClient(event);
    } else {
      this.editClient(event);
    }
  }

  submitClient(newClient: Client) {
    this.isLoading = true;
    this.apiService.create(newClient).subscribe({
      next: response => {
        this.handleNotification(
          'success',
          'O Cliente foi criado com sucesso',
          `O Cliente ${
            response.name ? response.name : ''
          } foi criado com sucesso.`
        );
        this.pageParams = defaultParams();
        this.pageParams.size = 6;
        this.table.reset();
        this.getData();
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

  editClient(client1: Client): void {
    this.isLoading = true;
    this.apiService.change(client1.id ? client1.id : 0, client1).subscribe({
      next: () => {
        this.handleNotification(
          'success',
          'Cliente Editado com sucesso',
          undefined
        );
        this.getData();
      },
      error: (error: HttpErrorResponse) => {
        this.handleNotification(
          'error',
          `${error.status} - ${error.statusText}`,
          error.message
        );
        this.isLoading = false;
        this.client = {};
      }
    });
  }

  deleteClient(id: number): void {
    this.modal = false;
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja apagar esse cliente?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.apiService.delete(id).subscribe({
          next: () => {
            this.handleNotification(
              'success',
              'Cliente deletado com sucesso',
              undefined
            );
            this.pageParams = defaultParams();
            this.pageParams.size = 6;
            this.table.reset();
            this.getData();
          },
          error: (error: HttpErrorResponse) => {
            this.handleNotification(
              'error',
              `${error.status} - ${error.statusText}`,
              error.message
            );
            this.isLoading = false;
            this.client = {};
          }
        });
      },
      reject: () => {
        this.closeEditModal();
      }
    });
  }

  isDisabled(): boolean {
    return (
      this.currentUser.function !== FunctionEnum.ADMINISTRADOR &&
      this.currentUser.function !== FunctionEnum.MASTER &&
      this.currentUser.function !== FunctionEnum.GERENTE
    );
  }

  getDate(date: string | Date): string {
    return new Date(date).toLocaleString();
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
      this.getData();
    }
    this.lastLazyLoad = event;
  }

  private getData(): void {
    this.isLoading = true;
    this.apiService.getAll(paramGenerate(this.pageParams)).subscribe({
      next: response => {
        this.clients = response.data;
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
