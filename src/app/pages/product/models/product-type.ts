import { ProductConversionType } from '@pages/product/models/product-conversion-type';
import { ProductPrimitiveType } from '@pages/product/models/product-primitive-type';

export interface ProductType {
  id?: number;
  productPrimitiveType?: ProductPrimitiveType;
  productConversionTypes?: ProductConversionType[];
}
