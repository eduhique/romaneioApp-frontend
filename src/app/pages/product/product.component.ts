import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash';

import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService
} from 'primeng/api';
import { Table } from 'primeng/table';

import { PaginatorParams } from '@core/models/paginator-params';

import { defaultParams, paramGenerate } from '@shared/utils/helper';

import { Product } from '@pages/product/models/product';
import { ProductService } from '@pages/product/services/product/product.service';
import { FunctionEnum } from '@pages/setup/models/function';
import { User } from '@pages/setup/models/user';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('table')
  table!: Table;

  public qtdRegistros: number;
  public products: Product[];
  public isLoading: boolean;
  public product: Product;
  public editModal: boolean;
  public currentUser: User;
  private lastLazyLoad!: LazyLoadEvent;
  private pageParams: PaginatorParams;

  constructor(
    private apiService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.isLoading = false;
    this.qtdRegistros = 11;

    this.products = [];

    this.product = {};

    this.pageParams = defaultParams();
    this.pageParams.size = 6;

    this.editModal = false;

    const userString = localStorage.getItem('currentUser');

    this.currentUser = userString ? (JSON.parse(userString) as User) : {};
  }

  ngOnInit(): void {
    this.pageParams = defaultParams();
    this.pageParams.size = 6;
    this.getData();
  }

  submitProduct(newProduct: Product) {
    this.isLoading = true;
    this.apiService.create(newProduct).subscribe({
      next: response => {
        this.handleNotification(
          'success',
          'O Produto foi criado com sucesso',
          `O produto ${
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

  editProduct(product1: Product): void {
    this.isLoading = true;
    this.editModal = false;
    this.apiService.change(product1.id ? product1.id : 0, product1).subscribe({
      next: () => {
        this.handleNotification(
          'success',
          'Produto Editado com sucesso',
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
        this.product = {};
      }
    });
  }

  deleteProduct(id: number): void {
    this.editModal = false;
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja apagar esse produto?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.apiService.delete(id).subscribe({
          next: () => {
            this.handleNotification(
              'success',
              'Produto deletado com sucesso',
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
            this.product = {};
          }
        });
      },
      reject: () => {
        this.closeEditModal();
      }
    });
  }

  openEditModal(product1: Product): void {
    this.product = cloneDeep<Product>(product1);
    this.editModal = true;
  }

  closeEditModal(): void {
    this.editModal = false;
    this.product = {};
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
        this.products = response.data;
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
