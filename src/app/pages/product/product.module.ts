import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';

import { SharedModule } from '@shared/shared.module';

import { ProductRoutingModule } from './product-routing.module';

import { ProductComponent } from '../product/product.component';
import { ConversionTableComponent } from './components/conversion-table/conversion-table.component';

@NgModule({
  declarations: [ProductComponent, ConversionTableComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    TableModule,
    SharedModule,
    ButtonModule,
    RippleModule
  ]
})
export class ProductModule {}
