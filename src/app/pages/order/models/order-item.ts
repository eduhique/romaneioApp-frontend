import { Product } from '@pages/product/models/product';
import { ProductPrimitiveType } from '@pages/product/models/product-primitive-type';

export interface OrderItem {
  id: number;

  product: Product;

  amount: number;

  productPrimitiveType: ProductPrimitiveType;

  lastUpdate: Date;

  detached: boolean;

  conferred: boolean;
}
