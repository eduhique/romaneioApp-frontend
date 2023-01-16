import { HttpParams } from '@angular/common/http';

import { PaginatorParams } from '@core/models/paginator-params';

export function defaultParams(): PaginatorParams {
  return {
    page: 0,
    size: 5,
    order: 'id',
    direction: 'asc'
  };
}

export function paramGenerate(pageParams: PaginatorParams): HttpParams {
  let params = new HttpParams();
  if (pageParams.filter && Object.entries(pageParams.filter).length > 0) {
    params = params.appendAll(pageParams.filter);
  }
  if (pageParams.page) {
    params = params.append('page', pageParams.page);
  }

  if (pageParams.size) {
    params = params.append('size', pageParams.size);
  }

  if (pageParams.order) {
    params = params.append('order', pageParams.order);
  }

  if (pageParams.direction) {
    params = params.append('direction', pageParams.direction);
  }

  return params;
}
