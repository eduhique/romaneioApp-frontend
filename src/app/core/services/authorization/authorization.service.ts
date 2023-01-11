import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map, Observable, of } from 'rxjs';

import { JwtDTO } from '@core/models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = `${environment.apiPath}/auth`;
  }

  isAuthenticated(): Observable<boolean> {
    const jwtTokenString: string | null = localStorage.getItem('jwtToken');

    if (jwtTokenString) {
      return this.http.get<boolean>(`${this.apiPath}/validation`).pipe(
        map(result => {
          if (!result) localStorage.removeItem('jwtToken');

          return result;
        })
      );
    } else {
      return of(false);
    }
  }

  getToken(): JwtDTO | null {
    const jwtTokenString: string | null = localStorage.getItem('jwtToken');

    if (jwtTokenString) {
      return JSON.parse(jwtTokenString) as JwtDTO;
    } else {
      return null;
    }
  }

  signIn(username: string, password: string): Observable<JwtDTO> {
    return this.http
      .post<JwtDTO>(this.apiPath, { login: username, password })
      .pipe(
        map(response => {
          response.createdDate = new Date();
          localStorage.setItem('jwtToken', JSON.stringify(response));
          return response;
        })
      );
  }
}
