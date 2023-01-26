import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewOrderComponent } from '@pages/order/components/new-order/new-order.component';
import { OrderComponent } from '@pages/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent
  },
  {
    path: 'new',
    data: { title: 'Novo Pedido' },
    component: NewOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
