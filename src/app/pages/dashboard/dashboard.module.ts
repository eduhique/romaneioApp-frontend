import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';

@NgModule({
  declarations: [DashboardComponent, DashboardCardComponent],
  imports: [CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
