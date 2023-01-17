import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Page } from '@core/models/page';

import { Product } from '@pages/product/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = `${environment.apiPath}/products`;
  }

  create(productPrimitiveType: Product): Observable<Product> {
    return this.http.post<Product>(this.apiPath, productPrimitiveType);
  }

  change(id: number, productPrimitiveType: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiPath}/${id}`,
      productPrimitiveType
    );
  }

  getAll(params?: HttpParams): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(this.apiPath, { params });
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiPath}/${id}`);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }
}
