import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';

import { Page } from '@core/models/page';

import { Romaneio } from '@pages/romaneios/models/romaneio';
import { RomaneioStatus } from '@pages/romaneios/models/romaneio-status';

@Injectable({
  providedIn: 'root'
})
export class RomaneiosService {
  private readonly apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = `${environment.apiPath}/romaneios`;
  }

  create(romaneio: Romaneio): Observable<Romaneio> {
    return this.http.post<Romaneio>(this.apiPath, romaneio);
  }

  change(id: number, romaneio: Romaneio): Observable<Romaneio> {
    return this.http.put<Romaneio>(`${this.apiPath}/${id}`, romaneio);
  }

  getAll(params?: HttpParams): Observable<Page<Romaneio>> {
    return this.http.get<Page<Romaneio>>(this.apiPath, { params });
  }

  get(id: number): Observable<Romaneio> {
    return this.http.get<Romaneio>(`${this.apiPath}/${id}`);
  }

  findActive(): Observable<Romaneio> {
    return this.http.get<Romaneio>(`${this.apiPath}/active`).pipe(
      map(response => {
        localStorage.setItem('romaneio', JSON.stringify(response));

        return response;
      })
    );
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }

  cancelRomaneio(id: number): Observable<unknown> {
    return this.http.patch(`${this.apiPath}/${id}/cancel`, null);
  }

  modifyStatus(id: number, status: RomaneioStatus): Observable<unknown> {
    return this.http.patch(
      `${this.apiPath}/${id}/change-status/${status}`,
      null
    );
  }

  changeStatus(id: number): Observable<unknown> {
    return this.http.patch(`${this.apiPath}/${id}/next-status`, null);
  }

  active(id: number): Observable<unknown> {
    return this.http.patch(`${this.apiPath}/${id}/active`, null).pipe(
      map(() => {
        this.findActive().subscribe();
      })
    );
  }
}
