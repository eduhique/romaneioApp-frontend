export interface PaginatorParams {
  filter?: { [key: string]: string | boolean | number };
  order?: string;
  page?: number;
  direction?: 'asc' | 'desc';
  size?: number;
}
