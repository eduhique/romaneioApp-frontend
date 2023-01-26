import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Page } from '@core/models/page';

import { Order } from '@pages/order/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = `${environment.apiPath}/orders`;
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiPath, order);
  }

  change(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiPath}/${id}`, order);
  }

  getAll(params?: HttpParams): Observable<Page<Order>> {
    return this.http.get<Page<Order>>(this.apiPath, { params });
  }

  get(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiPath}/${id}`);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }

  changeStatus(id: number): Observable<unknown> {
    return this.http.patch(`${this.apiPath}/${id}/next-status`, null);
  }
}
