import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';
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
    BrowserAnimationsModule,

    // App components
    AppRoutingModule,
    SharedModule,
    CoreModule,

    // PrimeNG Components
    ButtonModule,
    RippleModule,
    InputTextModule,
    MenubarModule,
    CheckboxModule,
    ProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
