import { ProductReport } from '@pages/romaneios/models/product-report';
import { Romaneio } from '@pages/romaneios/models/romaneio';

export interface RomaneioReport {
  romaneio: Romaneio;
  productReports: ProductReport[];
  totals: { [k: string]: number };
}
