import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { MessageService } from 'primeng/api';

import { AuthorizationService } from '@core/services/authorization/authorization.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authorization: AuthorizationService,
    private message: MessageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let headers = request.headers;
    const token = this.authorization.getToken();

    if (token && !request.url.endsWith('/auth')) {
      headers = request.headers.set(
        'Authorization',
        `${token?.prefix} ${token?.token}`
      );
    }

    const requestClone = request.clone({ headers });

    return next.handle(requestClone).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401)
          this.handleNotification('error', error.statusText, error.message);

        return throwError(() => error);
      })
    );
  }

  handleNotification(
    type: 'success' | 'info' | 'warn' | 'error',
    title: string,
    detail: string
  ): void {
    this.message.add({ severity: type, summary: title, detail });
  }
}
