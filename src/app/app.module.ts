import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';

import { CoreModule } from '@core/core.module';

import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular components
    BrowserModule,

    // App components
    AppRoutingModule,
    SharedModule,
    CoreModule,

    // PrimeNG Components
    ButtonModule,
    RippleModule,
    InputTextModule,
    MenubarModule,
    CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
