/* eslint-disable dot-notation */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import { SelectItem } from 'primeng/api';

import { PaginatorParams } from '@core/models/paginator-params';

import { defaultParams, paramGenerate } from '@shared/utils/helper';

import { Product } from '@pages/product/models/product';
import { ProductConversionType } from '@pages/product/models/product-conversion-type';
import { ProductPrimitiveType } from '@pages/product/models/product-primitive-type';
import { ProductPrimitiveTypeService } from '@pages/product/services/productPrimitiveType/product-primitive-type.service';

@Component({
  selector: 'romaneio-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnChanges {
  @Input()
  public action: string;

  @Input()
  public modal: boolean;

  @Input()
  public product: Product;

  @Output()
  public closeModal: EventEmitter<void>;

  @Output()
  public sendProduct: EventEmitter<Product>;

  public conversionTypes: ProductConversionType[];
  public primitiveType!: ProductPrimitiveType | null;

  public lazyItems: SelectItem[];
  public lazyItemsSecondary: SelectItem[];

  private pageParams: PaginatorParams;
  private lastPage: { lastPage: number; lastFirst: number };

  constructor(private primitiveTypeService: ProductPrimitiveTypeService) {
    this.modal = false;
    this.action = '';
    this.product = {};

    this.closeModal = new EventEmitter<void>();
    this.sendProduct = new EventEmitter<Product>();

    this.lazyItems = [];
    this.lazyItemsSecondary = [];

    this.conversionTypes = [];

    this.pageParams = defaultParams();
    this.pageParams.size = 20;
    this.lastPage = { lastPage: 0, lastFirst: 0 };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue !== undefined) {
      this.onChange({ first: 0, last: 20 });

      const product = changes['product'].currentValue as Product;

      if (product.productType?.productConversionTypes) {
        this.conversionTypes = product.productType.productConversionTypes;
      }
    }
  }

  hiddenModal() {
    this.primitiveType = null;
    this.pageParams = defaultParams();
    this.pageParams.size = 20;
    this.lastPage = { lastPage: 0, lastFirst: 0 };
    this.conversionTypes = [];

    this.closeModal.emit();
  }

  submitProduct() {
    if (this.isValid() && this.product.productType !== undefined) {
      this.product.name = this.product.name?.trim();
      this.product.productType.productConversionTypes = [
        ...new Set<ProductConversionType>(this.conversionTypes)
      ];

      this.sendProduct.emit(this.product);
    }
  }

  isValid() {
    const name =
      this.product.name !== undefined && this.product.name?.trim().length > 0;
    const active = this.product.active !== undefined;
    const type =
      this.product.productType !== undefined &&
      this.product.productType.productPrimitiveType !== undefined;

    return name && active && type;
  }

  onChange(event: { first: number; last: number }) {
    if (event.first > this.lastPage.lastFirst || event.first === 0) {
      this.pageParams.page = event.first === 0 ? 0 : this.lastPage.lastPage + 1;
      this.primitiveTypeService
        .getAll(paramGenerate(this.pageParams))
        .subscribe(res => {
          this.lazyItems = res.data.map(data => {
            return {
              label: data.longName,
              value: data,
              disabled: data.id === this.getSelectedPrimary()?.id
            };
          });
          this.secondaryListGenerate(res.data);
          this.lastPage.lastFirst = event.first;
          this.lastPage.lastPage = res.pageNumber;
        });
    }
  }

  getSelectedPrimary() {
    if (
      this.product.productType &&
      this.product.productType.productPrimitiveType
    ) {
      return this.product.productType.productPrimitiveType;
    }
    return undefined;
  }

  selectType(event: { value: ProductPrimitiveType }) {
    if (this.product.productType === undefined) {
      this.product.productType = { productPrimitiveType: event.value };
    } else {
      this.product.productType.productPrimitiveType = event.value;
    }
  }

  deleteRow(index: number) {
    this.conversionTypes.splice(index, 1);
  }

  getEditable() {
    const result: { [s: string]: boolean } = {};
    this.conversionTypes.forEach(conversion => {
      const key: string =
        conversion.targetProductPrimitiveType?.shortName !== undefined
          ? conversion.targetProductPrimitiveType?.shortName
          : 'key';

      result[key] = true;
    });
    return result;
  }

  addType() {
    if (!this.isDisabled()) {
      this.conversionTypes.push({
        fromPrimary: 1,
        toTarget: 1,
        targetProductPrimitiveType: this.primitiveType ? this.primitiveType : {}
      });

      this.primitiveType = null;
    }
  }

  isDisabled(): boolean {
    return (
      this.primitiveType === null ||
      this.primitiveType === undefined ||
      (this.conversionTypes.length > 0 &&
        this.conversionTypes.some(
          type => type.targetProductPrimitiveType?.id === this.primitiveType?.id
        ))
    );
  }

  getPrimaryTypeString() {
    return ` ${
      this.product.productType?.productPrimitiveType?.shortName !== undefined
        ? this.product.productType?.productPrimitiveType?.shortName
        : ''
    }`;
  }

  private secondaryListGenerate(data: ProductPrimitiveType[]) {
    this.lazyItemsSecondary = data.map(data => {
      return {
        label: data.longName,
        value: data,
        disabled:
          this.conversionTypes.some(
            type => type.targetProductPrimitiveType?.id === data.id
          ) || data.id === this.getSelectedPrimary()?.id
      };
    });
  }
}
