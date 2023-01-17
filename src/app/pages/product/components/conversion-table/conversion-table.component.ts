import { Component, Input } from '@angular/core';

import { ProductConversionType } from '@pages/product/models/product-conversion-type';
import { ProductType } from '@pages/product/models/product-type';

@Component({
  selector: 'romaneio-conversion-table',
  templateUrl: './conversion-table.component.html',
  styleUrls: ['./conversion-table.component.scss']
})
export class ConversionTableComponent {
  @Input()
  public productType: ProductType;

  constructor() {
    this.productType = {};
  }

  getList() {
    return this.productType.productConversionTypes
      ? Array.from(this.productType.productConversionTypes)
      : [];
  }

  getSummaryText(productConversionType?: ProductConversionType): string {
    if (productConversionType) {
      return `${
        productConversionType.fromPrimary
          ? productConversionType.fromPrimary
          : ''
      } ${
        this.productType.productPrimitiveType?.shortName
          ? this.productType.productPrimitiveType?.shortName
          : ''
      } de deste produto é equivalente a ${
        productConversionType.toTarget ? productConversionType.toTarget : ''
      } ${
        productConversionType.targetProductPrimitiveType?.shortName
          ? productConversionType.targetProductPrimitiveType?.shortName
          : ''
      }.`;
    }

    return '';
  }

  isPaginatorAble(): boolean {
    return (
      this.productType.productConversionTypes !== undefined &&
      this.productType.productConversionTypes.size > 5
    );
  }
}
