import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { CoreModule } from '@core/core.module';

import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';

import { ForbiddenComponent } from './components/forbidden/forbidden.component';

import { BackDirective } from './directives/backButton/back.directive';

@NgModule({
  declarations: [BackDirective, PageNotFoundComponent, ForbiddenComponent],
  imports: [
    // Angular Modules
    CommonModule,
    BrowserModule,

    // App modules
    CoreModule,
    ButtonModule,
    RippleModule,
    RouterLink

    // PrimeNG Modules
  ],
  exports: [PageNotFoundComponent, BackDirective, ForbiddenComponent]
})
export class SharedModule {}
