import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthorizationService } from '@core/services/authorization/authorization.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authorization: AuthorizationService) {}

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

    return next.handle(requestClone);
  }
}
