import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RomaneiosComponent } from '@pages/romaneios/romaneios.component';

const routes: Routes = [
  {
    path: '',
    component: RomaneiosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RomaneiosRoutingModule {}
