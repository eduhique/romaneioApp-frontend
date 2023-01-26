import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';

import { NavigationService } from '@core/services/navigation/navigation.service';

import { Client } from '@pages/clients/models/client';
import { Order } from '@pages/order/models/order';
import { OrderItem } from '@pages/order/models/order-item';
import { OrderStatus } from '@pages/order/models/order-status';
import { OrdersService } from '@pages/order/services/orders/orders.service';
import { Product } from '@pages/product/models/product';
import { ProductPrimitiveType } from '@pages/product/models/product-primitive-type';
import { Romaneio } from '@pages/romaneios/models/romaneio';
import { User } from '@pages/setup/models/user';

@Component({
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent {
  public userModal: boolean;

  public romaneioModal: boolean;

  public clientModal: boolean;

  public productModal: boolean;

  public order: Order;

  constructor(
    private apiService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private navigationService: NavigationService,
    private router: Router
  ) {
    this.userModal = false;
    this.romaneioModal = false;
    this.clientModal = false;
    this.productModal = false;

    this.order = {
      status: OrderStatus.REALIZADO,
      orderItems: []
    };

    const userString = localStorage.getItem('currentUser');

    this.order.user = userString ? (JSON.parse(userString) as User) : undefined;

    const romaneioString = localStorage.getItem('romaneio');

    this.order.romaneio = romaneioString
      ? (JSON.parse(romaneioString) as Romaneio)
      : undefined;
  }

  getSelectionLabel(object: Client | Romaneio | undefined) {
    return object && object.id && object.name
      ? `${object.id} - ${object.name}`
      : '';
  }

  closeUserModal() {
    this.userModal = false;
  }

  closeRomaneioModal() {
    this.romaneioModal = false;
  }

  closeClientModal() {
    this.clientModal = false;
  }

  closeProductModal() {
    this.productModal = false;
  }

  onUserSelect(user: User) {
    this.order.user = user;
    this.userModal = false;
  }

  onRomaneioSelect(romaneio: Romaneio) {
    this.order.romaneio = romaneio;
    this.romaneioModal = false;
  }

  onClientSelect(client: Client) {
    this.order.client = client;
    this.clientModal = false;
  }

  onProductSelect(product: Product) {
    const item: OrderItem = {
      product,
      amount: 0,
      productPrimitiveType: product.productType?.productPrimitiveType,
      detached: false,
      conferred: false
    };
    this.order.orderItems.push(item);
    this.productModal = false;
  }

  isValid() {
    return (
      this.order.orderItems.length > 0 &&
      this.order.user !== undefined &&
      this.order.client !== undefined &&
      this.order.romaneio !== undefined &&
      this.order.status === OrderStatus.REALIZADO
    );
  }

  sendOrder() {
    if (this.isValid()) {
      this.confirmationService.confirm({
        message: 'Você tem certeza que deseja criar o pedido?',
        header: 'Confirmação de pedido',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.navigationService.sendLoading(true);
          this.apiService.create(this.order).subscribe({
            next: () => {
              this.navigationService.sendLoading(false);
              this.handleNotification(
                'success',
                'O Pedido foi criado com sucesso',
                undefined
              );
              this.router.navigate(['/']);
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
  }

  clearOrderItems() {
    if (this.order.orderItems.length > 0) {
      this.confirmationService.confirm({
        message: 'Você tem certeza que deseja limpar a lista de produtos?',
        header: 'Confirmação de limpeza',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.order.orderItems = [];
        }
      });
    }
  }

  getEditable() {
    const result: { [s: string]: boolean } = {};
    this.order.orderItems.forEach(orderItem => {
      const key: string =
        orderItem.product?.id !== undefined
          ? String(orderItem.product?.id)
          : 'key';
      result[key] = true;
    });
    return result;
  }

  getTypes(orderItem: OrderItem) {
    const typesList: ProductPrimitiveType[] =
      orderItem.product?.productType?.productConversionTypes !== undefined
        ? orderItem.product?.productType?.productConversionTypes?.map(
            conversion => {
              if (conversion.targetProductPrimitiveType) {
                return conversion.targetProductPrimitiveType;
              }
              return {} as ProductPrimitiveType;
            }
          )
        : [];
    return [orderItem.product?.productType?.productPrimitiveType, ...typesList];
  }

  deleteRow(index: number) {
    this.order.orderItems.splice(index, 1);
  }

  handleChange(index: number) {
    this.order.orderItems[index].amount = 0;
  }

  private handleNotification(
    type: 'success' | 'info' | 'warn' | 'error',
    title: string,
    detail: string | undefined
  ): void {
    this.messageService.add({ severity: type, summary: title, detail });
  }
}
