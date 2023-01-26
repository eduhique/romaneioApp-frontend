import { ProductReport } from '@pages/romaneios/models/product-report';
import { Romaneio } from '@pages/romaneios/models/romaneio';
import { RomaneioReportSubtotal } from '@pages/romaneios/models/romaneio-report-subtotal';

export interface RomaneioReport {
  romaneio: Romaneio;
  productReports: ProductReport[];
  totals: { [k: string]: RomaneioReportSubtotal };
}
