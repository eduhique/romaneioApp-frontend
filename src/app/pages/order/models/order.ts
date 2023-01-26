import { Client } from '@pages/clients/models/client';
import { OrderItem } from '@pages/order/models/order-item';
import { OrderStatus } from '@pages/order/models/order-status';
import { Romaneio } from '@pages/romaneios/models/romaneio';
import { User } from '@pages/setup/models/user';

export interface Order {
  id?: number;
  romaneio?: Romaneio;
  client?: Client;
  user?: User;
  orderItems: OrderItem[];
  status?: OrderStatus;
  statusDate?: Date;
  createdDate?: Date;
  lastUpdate?: Date;
  comments?: string;
}
