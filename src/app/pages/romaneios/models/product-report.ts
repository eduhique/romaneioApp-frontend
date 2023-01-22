import { Product } from '@pages/product/models/product';
import { ProductClientReport } from '@pages/romaneios/models/product-client-report';

export interface ProductReport {
  product: Product;
  quantity: number;
  productClientReports: ProductClientReport[];
}
