import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';

import { AuthGuard } from '@core/guards/auth.guard';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { AuthorizationService } from '@core/services/authorization/authorization.service';
import { NavigationService } from '@core/services/navigation/navigation.service';

import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, HttpClientModule, MenubarModule],
  providers: [
    NavigationService,
    AuthorizationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  exports: [NavbarComponent]
})
export class CoreModule {}
