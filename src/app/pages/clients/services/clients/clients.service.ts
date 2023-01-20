import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Page } from '@core/models/page';

import { Client } from '@pages/clients/models/client';
import { Product } from '@pages/product/models/product';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private readonly apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = `${environment.apiPath}/clients`;
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiPath, client);
  }

  change(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiPath}/${id}`, client);
  }

  getAll(params?: HttpParams): Observable<Page<Client>> {
    return this.http.get<Page<Client>>(this.apiPath, { params });
  }

  get(id: number): Observable<Client> {
    return this.http.get<Product>(`${this.apiPath}/${id}`);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }
}
