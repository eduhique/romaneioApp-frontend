import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Page } from '@core/models/page';

import { User } from '@pages/setup/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = `${environment.apiPath}/users`;
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiPath, user);
  }

  putUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiPath}/${id}`, user);
  }

  getAllUser(params?: HttpParams): Observable<Page<User>> {
    return this.http.get<Page<User>>(this.apiPath, { params });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiPath}/${id}`);
  }

  changePassword(id: number, password: string): void {
    this.http.patch(`${this.apiPath}/${id}/change-password`, {
      newPassword: password
    });
  }

  deleteUser(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }
}
