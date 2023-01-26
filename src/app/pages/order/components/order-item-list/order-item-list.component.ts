import { Component, Input } from '@angular/core';

import { OrderItem } from '@pages/order/models/order-item';

@Component({
  selector: 'romaneio-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.scss']
})
export class OrderItemListComponent {
  @Input()
  public orderItemList: OrderItem[];

  constructor() {
    this.orderItemList = [];
  }
}
