import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';

import { SharedModule } from '@shared/shared.module';

import { NewClientComponent } from '@pages/clients/components/new-client/new-client.component';
import { ClientsService } from '@pages/clients/services/clients/clients.service';

import { ClientsRoutingModule } from './clients-routing.module';

import { ClientsComponent } from './clients.component';

@NgModule({
  declarations: [ClientsComponent, NewClientComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClientsRoutingModule,
    ButtonModule,
    RippleModule,
    TableModule,
    SharedModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule
  ],
  providers: [ClientsService]
})
export class ClientsModule {}
