import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { environment } from '@environments/environment';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

import { JwtDTO } from '@core/models/jwt-dto';

import { User } from '@pages/setup/models/user';

const jwtToken = 'jwtToken';

const currentUser = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly apiPath: string;
  private _auth: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.apiPath = `${environment.apiPath}/auth`;
    this._auth = new BehaviorSubject<boolean>(false);
  }

  get auth(): Observable<boolean> {
    return this._auth.asObservable();
  }

  isAuthenticated(): Observable<boolean | UrlTree> {
    const jwtTokenString: string | null = localStorage.getItem(jwtToken);

    if (jwtTokenString) {
      return this.http.get<boolean>(`${this.apiPath}/validation`).pipe(
        map(result => {
          if (!result) {
            localStorage.removeItem(jwtToken);
            localStorage.removeItem(currentUser);
            this._auth.next(false);
            return this.router.createUrlTree(['login']);
          }
          this._auth.next(true);
          return result;
        })
      );
    } else {
      return of(this.router.createUrlTree(['login']));
    }
  }

  getToken(): JwtDTO | null {
    const jwtTokenString: string | null = localStorage.getItem(jwtToken);

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

          localStorage.setItem(jwtToken, JSON.stringify(response));

          this.getCurrentUser().subscribe();

          this._auth.next(true);
          return response;
        })
      );
  }

  signOut(): void {
    localStorage.removeItem(jwtToken);
    localStorage.removeItem(currentUser);
  }

  getCurrentUser(): Observable<User> {
    const userString: string | null = localStorage.getItem(currentUser);

    if (userString) {
      return of(JSON.parse(userString) as User);
    }

    return this.http.get<User>(`${this.apiPath}/current-user`).pipe(
      map(response => {
        localStorage.setItem(currentUser, JSON.stringify(response));
        return response;
      })
    );
  }
}
