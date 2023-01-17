import { ProductType } from '@pages/product/models/product-type';

export interface Product {
  id?: number;
  name?: string;
  active?: boolean;
  productType?: ProductType;
  createdDate?: Date;
  lastUpdate?: Date;
}
