import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProductPrimitiveType } from '@pages/product/models/product-primitive-type';

@Component({
  selector: 'romaneio-edit-primitive-type-management',
  templateUrl: './edit-primitive-type-management.component.html',
  styleUrls: ['./edit-primitive-type-management.component.scss']
})
export class EditPrimitiveTypeManagementComponent {
  public blockSpace: RegExp;
  @Input()
  public modal: boolean;

  @Input()
  public primitiveType: ProductPrimitiveType;

  @Output()
  public closeModal: EventEmitter<void>;

  @Output()
  public sendType: EventEmitter<ProductPrimitiveType>;

  @Output()
  public deleteType: EventEmitter<number>;

  constructor() {
    this.modal = false;
    this.primitiveType = {};
    this.blockSpace = /\S/;
    this.closeModal = new EventEmitter<void>();
    this.sendType = new EventEmitter<ProductPrimitiveType>();
    this.deleteType = new EventEmitter<number>();
  }

  hiddenModal(): void {
    this.closeModal.emit();
  }

  isValid(): boolean {
    return (
      this.primitiveType.longName !== undefined &&
      this.primitiveType.longName.trim().length > 0 &&
      this.idShortValid()
    );
  }

  submitType(): void {
    if (this.isValid()) {
      this.primitiveType.longName = this.primitiveType.longName?.trim();
      this.primitiveType.shortName = this.primitiveType.shortName
        ?.trim()
        .toLowerCase();

      this.sendType.emit(this.primitiveType);
    }
  }

  delete() {
    this.deleteType.emit(this.primitiveType.id);
  }

  idShortValid() {
    return (
      this.primitiveType.shortName !== undefined &&
      this.primitiveType.shortName.trim().length > 0 &&
      this.primitiveType.shortName.trim().length <= 5
    );
  }
}
