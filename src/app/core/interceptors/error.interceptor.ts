import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private message: MessageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.router.navigateByUrl('/error/forbidden');
        } else if (error.status === 404) {
          this.handleNotification(
            'warn',
            `${error.status} - ${error.statusText}`,
            error.message
          );
        } else {
          this.handleNotification(
            'error',
            `${error.status} - ${error.statusText}`,
            error.message
          );
        }
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
