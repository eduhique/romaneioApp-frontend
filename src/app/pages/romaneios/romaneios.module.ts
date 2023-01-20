import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RomaneiosRoutingModule } from './romaneios-routing.module';

import { RomaneiosComponent } from '../romaneios/romaneios.component';

@NgModule({
  declarations: [RomaneiosComponent],
  imports: [CommonModule, RomaneiosRoutingModule]
})
export class RomaneiosModule {}
