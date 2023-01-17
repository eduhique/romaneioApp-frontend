import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';

import { SharedModule } from '@shared/shared.module';

import { ProductPrimitiveTypeService } from '@pages/product/services/productPrimitiveType/product-primitive-type.service';
import { UsersService } from '@pages/setup/services/users/users.service';

import { SetupRoutingModule } from './setup-routing.module';

import { SetupComponent } from '../setup/setup.component';
import { EditPrimitiveTypeManagementComponent } from './components/edit-primitive-type-management/edit-primitive-type-management.component';
import { EditUsersManagementComponent } from './components/edit-users-management/edit-users-management.component';
import { NewPrimitiveTypeManagementComponent } from './components/new-primitive-type-management/new-primitive-type-management.component';
import { NewUsersManagementComponent } from './components/new-users-management/new-users-management.component';
import { PrimitiveTypeManagementComponent } from './components/primitive-type-management/primitive-type-management.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';

@NgModule({
  declarations: [
    SetupComponent,
    UsersManagementComponent,
    NewUsersManagementComponent,
    EditUsersManagementComponent,
    PrimitiveTypeManagementComponent,
    EditPrimitiveTypeManagementComponent,
    NewPrimitiveTypeManagementComponent
  ],
  imports: [
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
    TableModule,
    InputSwitchModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    SharedModule
  ],
  providers: [UsersService, ConfirmationService, ProductPrimitiveTypeService]
})
export class SetupModule {}
