import { Component, EventEmitter, Output } from '@angular/core';

import { ProductPrimitiveType } from '@pages/product/models/product-primitive-type';

@Component({
  selector: 'romaneio-new-primitive-type-management',
  templateUrl: './new-primitive-type-management.component.html',
  styleUrls: ['./new-primitive-type-management.component.scss']
})
export class NewPrimitiveTypeManagementComponent {
  public modal: boolean;
  public submitted: boolean;
  public primitiveTypeEdit: ProductPrimitiveType;
  public blockSpace: RegExp;

  @Output()
  public sendType: EventEmitter<ProductPrimitiveType>;

  constructor() {
    this.modal = false;
    this.submitted = false;
    this.primitiveTypeEdit = {};
    this.blockSpace = /\S/;
    this.sendType = new EventEmitter<ProductPrimitiveType>();
  }

  openModal(): void {
    this.primitiveTypeEdit = { floatPoint: false };
    this.submitted = false;
    this.modal = true;
  }

  hiddenModal(): void {
    this.modal = false;
    this.submitted = false;
  }

  isValid(): boolean {
    return (
      this.primitiveTypeEdit.longName !== undefined &&
      this.primitiveTypeEdit.longName.trim().length > 0 &&
      this.idShortValid()
    );
  }

  submitType(): void {
    this.submitted = true;
    if (this.isValid()) {
      this.primitiveTypeEdit.longName = this.primitiveTypeEdit.longName?.trim();
      this.primitiveTypeEdit.shortName = this.primitiveTypeEdit.shortName
        ?.trim()
        .toLowerCase();

      this.modal = false;
      this.sendType.emit(this.primitiveTypeEdit);
      this.primitiveTypeEdit = {};
    }
  }

  idShortValid() {
    return (
      this.primitiveTypeEdit.shortName !== undefined &&
      this.primitiveTypeEdit.shortName.trim().length > 0 &&
      this.primitiveTypeEdit.shortName.trim().length <= 5
    );
  }
}
