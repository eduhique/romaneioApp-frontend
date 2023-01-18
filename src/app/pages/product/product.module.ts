import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

import { SharedModule } from '@shared/shared.module';

import { ProductRoutingModule } from './product-routing.module';

import { ProductComponent } from '../product/product.component';
import { ConversionTableComponent } from './components/conversion-table/conversion-table.component';
import { NewProductComponent } from './components/new-product/new-product.component';

@NgModule({
  declarations: [
    ProductComponent,
    ConversionTableComponent,
    NewProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    TableModule,
    SharedModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    RadioButtonModule,
    DropdownModule,
    SkeletonModule,
    DividerModule,
    InputNumberModule,
    ConfirmDialogModule
  ]
})
export class ProductModule {}
