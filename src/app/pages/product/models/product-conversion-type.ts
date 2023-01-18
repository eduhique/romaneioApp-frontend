import { ProductPrimitiveType } from '@pages/product/models/product-primitive-type';

export interface ProductConversionType {
  id?: number;
  fromPrimary?: number;
  toTarget?: number;
  targetProductPrimitiveType?: ProductPrimitiveType;
}
