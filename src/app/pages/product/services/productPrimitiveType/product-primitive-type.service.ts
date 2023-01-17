import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Page } from '@core/models/page';

import { ProductPrimitiveType } from '@pages/product/models/product-primitive-type';

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
    return this.http.post<ProductPrimitiveType>(
      this.apiPath,
      productPrimitiveType
    );
  }

  change(
    id: number,
    productPrimitiveType: ProductPrimitiveType
  ): Observable<ProductPrimitiveType> {
    return this.http.put<ProductPrimitiveType>(
      `${this.apiPath}/${id}`,
      productPrimitiveType
    );
  }

  getAll(params?: HttpParams): Observable<Page<ProductPrimitiveType>> {
    return this.http.get<Page<ProductPrimitiveType>>(this.apiPath, { params });
  }

  get(id: number): Observable<ProductPrimitiveType> {
    return this.http.get<ProductPrimitiveType>(`${this.apiPath}/${id}`);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }
}
