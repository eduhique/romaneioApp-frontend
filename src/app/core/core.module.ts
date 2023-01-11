import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

import { AuthGuard } from '@core/guards/auth.guard';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { AuthorizationService } from '@core/services/authorization/authorization.service';
import { NavigationService } from '@core/services/navigation/navigation.service';

import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MenubarModule, ToastModule],
  providers: [
    NavigationService,
    AuthorizationService,
    MessageService,
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
