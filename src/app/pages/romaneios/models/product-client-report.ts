import { Client } from '@pages/clients/models/client';
import { OrderItem } from '@pages/order/models/order-item';

export interface ProductClientReport {
  client: Client;
  orderItem: OrderItem;
}
