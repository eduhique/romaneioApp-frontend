import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { CoreModule } from '@core/core.module';

import { FunctionLabelComponent } from '@shared/components/function-label/function-label.component';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';

import { ForbiddenComponent } from './components/forbidden/forbidden.component';

import { BackDirective } from './directives/backButton/back.directive';

@NgModule({
  declarations: [
    BackDirective,
    PageNotFoundComponent,
    ForbiddenComponent,
    FunctionLabelComponent
  ],
  imports: [
    // App modules
    CoreModule,
    ButtonModule,
    RippleModule,
    RouterLink

    // PrimeNG Modules
  ],
  exports: [
    PageNotFoundComponent,
    BackDirective,
    ForbiddenComponent,
    FunctionLabelComponent
  ]
})
export class SharedModule {}
