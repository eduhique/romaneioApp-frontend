import { Component, Input } from '@angular/core';

import { ProductClientReport } from '@pages/romaneios/models/product-client-report';

@Component({
  selector: 'romaneio-product-client-reports-list',
  templateUrl: './product-client-reports-list.component.html',
  styleUrls: ['./product-client-reports-list.component.scss']
})
export class ProductClientReportsListComponent {
  @Input()
  public productClientReports: ProductClientReport[];

  constructor() {
    this.productClientReports = [];
  }
}
