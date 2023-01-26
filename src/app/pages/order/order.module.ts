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
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '@shared/shared.module';

import { OrderRoutingModule } from './order-routing.module';

import { OrderComponent } from '../order/order.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { OrderItemListComponent } from './components/order-item-list/order-item-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RomaneioListComponent } from './components/romaneio-list/romaneio-list.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    OrderComponent,
    NewOrderComponent,
    RomaneioListComponent,
    UserListComponent,
    ClientListComponent,
    ProductListComponent,
    OrderItemListComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    DividerModule,
    TableModule,
    SharedModule,
    ConfirmDialogModule,
    InputNumberModule,
    DropdownModule,
    TooltipModule
  ]
})
export class OrderModule {}
