import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { SetupRoutingModule } from './setup-routing.module';

import { SetupComponent } from '../setup/setup.component';
import { FunctionLabelComponent } from './components/function-label/function-label.component';
import { NewUsersManagementComponent } from './components/new-users-management/new-users-management.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';

@NgModule({
  declarations: [
    SetupComponent,
    UsersManagementComponent,
    NewUsersManagementComponent,
    FunctionLabelComponent
  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    SharedModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    RadioButtonModule,
    PasswordModule,
    DividerModule,
    KeyFilterModule,
    TableModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class SetupModule {}
