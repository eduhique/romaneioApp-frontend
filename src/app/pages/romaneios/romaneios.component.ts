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

import { Romaneio } from '@pages/romaneios/models/romaneio';
import { RomaneioStatus } from '@pages/romaneios/models/romaneio-status';
import { RomaneiosService } from '@pages/romaneios/service/romaneios/romaneios.service';
import { FunctionEnum } from '@pages/setup/models/function';
import { User } from '@pages/setup/models/user';

@Component({
  templateUrl: './romaneios.component.html',
  styleUrls: ['./romaneios.component.scss']
})
export class RomaneiosComponent implements OnInit {
  @ViewChild('table')
  table!: Table;

  public tabIndex: number;
  public qtdRegistros: number;
  public romaneios: Romaneio[];
  public isLoading: boolean;
  public romaneio: Romaneio;
  public modal: boolean;
  public currentUser: User;
  public currentRomaneio: Romaneio;
  public actionLabel: string;
  private lastLazyLoad!: LazyLoadEvent;
  private pageParams: PaginatorParams;

  constructor(
    private apiService: RomaneiosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.actionLabel = 'Novo Cliente';

    this.isLoading = false;
    this.qtdRegistros = 0;

    this.romaneios = [];

    this.romaneio = {};

    this.pageParams = defaultParams();
    this.pageParams.size = 6;
    this.pageParams.direction = 'desc';

    this.modal = false;

    const userString = localStorage.getItem('currentUser');

    this.currentUser = userString ? (JSON.parse(userString) as User) : {};

    const romaneioString = localStorage.getItem('romaneio');

    this.currentRomaneio = romaneioString
      ? (JSON.parse(romaneioString) as Romaneio)
      : {};

    this.tabIndex = this.isDisabled() || !this.currentRomaneio.id ? 1 : 0;
  }

  ngOnInit(): void {
    this.pageParams = defaultParams();
    this.pageParams.size = 6;
    this.pageParams.direction = 'desc';
    this.getData();
  }

  openModal() {
    const days = [
      'Domingo',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    const date = new Date();

    this.actionLabel = `Novo Romaneio`;
    this.romaneio = {
      name: days[date.getDay()],
      active: false,
      status: RomaneioStatus.CRIADO
    };
    this.modal = true;
  }

  openEditModal(romaneio1: Romaneio): void {
    this.actionLabel = `Editar ${romaneio1.name ? romaneio1.name : ''}`;
    this.romaneio = cloneDeep<Romaneio>(romaneio1);
    this.modal = true;
  }

  closeEditModal(): void {
    this.modal = false;
    this.romaneio = {};
  }

  verifySubmit(event: Romaneio) {
    this.modal = false;
    if (event.id === undefined) {
      this.submitRomaneio(event);
    } else {
      this.editRomaneio(event);
    }
  }

  submitRomaneio(newRomaneio: Romaneio) {
    this.isLoading = true;
    this.apiService.create(newRomaneio).subscribe({
      next: response => {
        this.handleNotification(
          'success',
          'O Romaneio foi criado com sucesso',
          `O Romaneio ${
            response.name ? response.name : ''
          } foi criado com sucesso.`
        );
        this.pageParams = defaultParams();
        this.pageParams.size = 6;
        this.pageParams.direction = 'desc';
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

  editRomaneio(romaneio1: Romaneio): void {
    this.isLoading = true;
    this.apiService
      .change(romaneio1.id ? romaneio1.id : 0, romaneio1)
      .subscribe({
        next: () => {
          this.handleNotification(
            'success',
            'Romaneio Editado com sucesso',
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
          this.romaneio = {};
        }
      });
  }

  deleteRomaneio(id: number): void {
    this.modal = false;
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja apagar esse romaneio?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.apiService.delete(id).subscribe({
          next: () => {
            this.handleNotification(
              'success',
              'Romaneio deletado com sucesso',
              undefined
            );
            this.pageParams = defaultParams();
            this.pageParams.size = 6;
            this.pageParams.direction = 'desc';
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
            this.romaneio = {};
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

  getDate(date: string | Date | undefined): string {
    return date ? new Date(date).toLocaleString() : '';
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

  activeRomaneio(id: number) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja Ativar este romaneio?',
      header: 'Confirmação de Ativação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.apiService.active(id).subscribe({
          next: () => {
            this.handleNotification(
              'success',
              'Romaneio Ativado com sucesso',
              undefined
            );
            this.pageParams = defaultParams();
            this.pageParams.size = 6;
            this.pageParams.direction = 'desc';
            this.getData();
            this.getRomaneioLocal();
            this.tabIndex = 0;
          },
          error: (error: HttpErrorResponse) => {
            this.handleNotification(
              'error',
              `${error.status} - ${error.statusText}`,
              error.message
            );
            this.isLoading = false;
            this.romaneio = {};
          }
        });
      }
    });
  }

  private getRomaneioLocal() {
    const romaneioString = localStorage.getItem('romaneio');

    this.currentRomaneio = romaneioString
      ? (JSON.parse(romaneioString) as Romaneio)
      : {};
  }

  private getData(): void {
    this.isLoading = true;
    this.apiService.getAll(paramGenerate(this.pageParams)).subscribe({
      next: response => {
        this.romaneios = response.data;
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
