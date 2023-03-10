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

import { ProductPrimitiveType } from '@pages/product/models/product-primitive-type';
import { ProductPrimitiveTypeService } from '@pages/product/services/productPrimitiveType/product-primitive-type.service';
import { FunctionEnum } from '@pages/setup/models/function';
import { User } from '@pages/setup/models/user';

@Component({
  selector: 'romaneio-primitive-type-management',
  templateUrl: './primitive-type-management.component.html',
  styleUrls: ['./primitive-type-management.component.scss']
})
export class PrimitiveTypeManagementComponent implements OnInit {
  @ViewChild('table')
  table!: Table;

  public qtdRegistros: number;
  public primitiveTypes: ProductPrimitiveType[];
  public isLoading: boolean;
  public primitiveTypeEdit: ProductPrimitiveType;
  public editModal: boolean;
  public currentUser: User;
  private lastLazyLoad!: LazyLoadEvent;
  private pageParams: PaginatorParams;

  constructor(
    private apiService: ProductPrimitiveTypeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.isLoading = false;
    this.qtdRegistros = 0;

    this.primitiveTypes = [];

    this.primitiveTypeEdit = {};

    this.pageParams = defaultParams();

    this.editModal = false;

    const userString = localStorage.getItem('currentUser');

    this.currentUser = userString ? (JSON.parse(userString) as User) : {};
  }

  ngOnInit(): void {
    this.pageParams = defaultParams();
    this.getTypes();
  }

  submitType(primitiveType: ProductPrimitiveType) {
    this.isLoading = true;
    this.apiService.create(primitiveType).subscribe({
      next: response => {
        this.handleNotification(
          'success',
          'Tipo primitivo criado com sucesso',
          `O tipo ${
            response.longName ? response.longName : ''
          } foi criado com sucesso.`
        );
        this.pageParams = defaultParams();
        this.table.reset();
        this.getTypes();
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

  editType(primitiveType: ProductPrimitiveType): void {
    this.isLoading = true;
    this.editModal = false;
    this.apiService
      .change(primitiveType.id ? primitiveType.id : 0, primitiveType)
      .subscribe({
        next: () => {
          this.handleNotification(
            'success',
            'Tipo primitivo Editado com sucesso',
            undefined
          );
          this.getTypes();
        },
        error: (error: HttpErrorResponse) => {
          this.handleNotification(
            'error',
            `${error.status} - ${error.statusText}`,
            error.message
          );
          this.isLoading = false;
          this.primitiveTypeEdit = {};
        }
      });
  }

  deleteType(id: number): void {
    this.editModal = false;
    this.confirmationService.confirm({
      message: 'Voc?? tem certeza que deseja apagar esse Tipo primitivo?',
      header: 'Confirma????o de Exclus??o',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.apiService.delete(id).subscribe({
          next: () => {
            this.handleNotification(
              'success',
              'Tipo primitivo deletado com sucesso',
              undefined
            );
            this.pageParams = defaultParams();
            this.table.reset();
            this.getTypes();
          },
          error: (error: HttpErrorResponse) => {
            this.handleNotification(
              'error',
              `${error.status} - ${error.statusText}`,
              error.message
            );
            this.isLoading = false;
            this.primitiveTypeEdit = {};
          }
        });
      },
      reject: () => {
        this.closeEditModal();
      }
    });
  }

  openEditModal(primitiveType: ProductPrimitiveType): void {
    this.primitiveTypeEdit = { ...primitiveType };
    this.editModal = true;
  }

  closeEditModal(): void {
    this.editModal = false;
    this.primitiveTypeEdit = {};
  }

  isDisabled(): boolean {
    return (
      this.currentUser.function !== FunctionEnum.ADMINISTRADOR &&
      this.currentUser.function !== FunctionEnum.MASTER &&
      this.currentUser.function !== FunctionEnum.GERENTE
    );
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
      this.getTypes();
    }
    this.lastLazyLoad = event;
  }

  private getTypes(): void {
    this.isLoading = true;
    this.apiService.getAll(paramGenerate(this.pageParams)).subscribe({
      next: response => {
        this.primitiveTypes = response.data;
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
