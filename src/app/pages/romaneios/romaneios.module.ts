import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '@shared/shared.module';

import { RomaneiosService } from '@pages/romaneios/service/romaneios/romaneios.service';

import { RomaneiosRoutingModule } from './romaneios-routing.module';

import { RomaneiosComponent } from '../romaneios/romaneios.component';
import { NewRomaneioComponent } from './components/new-romaneio/new-romaneio.component';
import { RomaneioReportComponent } from './components/romaneio-report/romaneio-report.component';

@NgModule({
  declarations: [
    RomaneiosComponent,
    NewRomaneioComponent,
    RomaneioReportComponent
  ],
  imports: [
    CommonModule,
    RomaneiosRoutingModule,
    ButtonModule,
    RippleModule,
    TabViewModule,
    TableModule,
    SharedModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    AccordionModule,
    TooltipModule
  ],
  providers: [RomaneiosService]
})
export class RomaneiosModule {}
