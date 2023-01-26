/* eslint-disable dot-notation */
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
import { NavigationService } from '@core/services/navigation/navigation.service';

import { defaultParams, paramGenerate } from '@shared/utils/helper';

import { Order } from '@pages/order/models/order';
import { OrderItem } from '@pages/order/models/order-item';
import { OrderStatus } from '@pages/order/models/order-status';
import { OrdersService } from '@pages/order/services/orders/orders.service';
import { Romaneio } from '@pages/romaneios/models/romaneio';
import { FunctionEnum } from '@pages/setup/models/function';
import { User } from '@pages/setup/models/user';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @ViewChild('table')
  table!: Table;

  public qtdRegistros: number;
  public orders: Order[];
  public isLoading: boolean;
  public currentUser: User;
  public currentRomaneio: Romaneio;

  private lastLazyLoad!: LazyLoadEvent;
  private pageParams: PaginatorParams;

  constructor(
    private apiService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private navigationService: NavigationService
  ) {
    this.isLoading = false;
    this.qtdRegistros = 11;

    this.orders = [];

    this.pageParams = defaultParams();
    this.pageParams.size = 6;

    const userString = localStorage.getItem('currentUser');

    this.currentUser = userString ? (JSON.parse(userString) as User) : {};

    const romaneioString = localStorage.getItem('romaneio');

    this.currentRomaneio = romaneioString
      ? (JSON.parse(romaneioString) as Romaneio)
      : {};
  }

  ngOnInit(): void {
    this.pageParams = defaultParams();
    this.pageParams.size = 6;
    this.getData();
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

  onTabView(event: { data: OrderItem; originalEvent: PointerEvent }) {
    window.scrollTo({ top: event.originalEvent.y, behavior: 'smooth' });
  }

  changeStatus(status: string, order: Order) {
    if (status === OrderStatus.SEPARANDO.valueOf() && order.id) {
      const orderClone: Order = cloneDeep<Order>(order);
      orderClone.status = OrderStatus.SEPARANDO;
      this.change(order.id, orderClone);
    }
    if (status === OrderStatus.ENTREGUE.valueOf() && order.id) {
      const orderClone: Order = cloneDeep<Order>(order);
      orderClone.status = OrderStatus.ENTREGUE;
      this.change(order.id, orderClone);
    }
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja apagar esse pedido?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.navigationService.sendLoading(true);

        this.apiService.delete(id).subscribe({
          next: () => {
            this.handleNotification(
              'success',
              'Romaneio deletado com sucesso',
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
            this.navigationService.sendLoading(false);
          }
        });
      }
    });
  }

  private change(id: number, order: Order) {
    this.confirmationService.confirm({
      message: `Você tem certeza que prover esse pedido para ${
        order.status ? order.status : ''
      }?`,
      header: 'Promoção de Status',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.navigationService.sendLoading(true);

        this.apiService.change(id, order).subscribe({
          next: () => {
            this.getData();
            this.handleNotification(
              'success',
              'O Pedido promovido com sucesso',
              undefined
            );
          },
          error: (error: HttpErrorResponse) => {
            this.handleNotification(
              'error',
              `${error.status} - ${error.statusText}`,
              error.message
            );
            this.navigationService.sendLoading(false);
          }
        });
      }
    });
  }

  private getData(): void {
    this.pageParams.filter = { ...this.pageParams.filter };
    if (this.currentRomaneio.id !== undefined)
      this.pageParams.filter['romaneio'] = this.currentRomaneio.id;
    if (
      this.currentUser.function === FunctionEnum.CONFERENTE &&
      this.currentUser.id
    )
      this.pageParams.filter['user'] = this.currentUser.id;

    this.isLoading = true;
    this.apiService.getAll(paramGenerate(this.pageParams)).subscribe({
      next: response => {
        this.orders = response.data;
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
        this.navigationService.sendLoading(false);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.handleNotification(
          'error',
          `${error.status} - ${error.statusText}`,
          error.message
        );
        this.navigationService.sendLoading(false);

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
