import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Page } from '@core/models/page';

import { ProductPrimitiveType } from '@shared/models/product-primitive-type';

import { User } from '@pages/setup/models/user';

@Injectable({
  providedIn: 'root'
})
export class ProductPrimitiveTypeService {
  private readonly apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = `${environment.apiPath}/primitive-types`;
  }

  create(
    productPrimitiveType: ProductPrimitiveType
  ): Observable<ProductPrimitiveType> {
    return this.http.post<User>(this.apiPath, productPrimitiveType);
  }

  change(
    id: number,
    productPrimitiveType: ProductPrimitiveType
  ): Observable<User> {
    return this.http.put<User>(`${this.apiPath}/${id}`, productPrimitiveType);
  }

  getAll(params?: HttpParams): Observable<Page<ProductPrimitiveType>> {
    return this.http.get<Page<User>>(this.apiPath, { params });
  }

  get(id: number): Observable<ProductPrimitiveType> {
    return this.http.get<User>(`${this.apiPath}/${id}`);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }
}
