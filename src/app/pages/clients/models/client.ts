import { ClientType } from '@pages/clients/models/client-type';

export interface Client {
  id?: number;
  name?: string;
  district?: string;
  clientType?: ClientType;
  createdDate?: Date;
  lastUpdate?: Date;
  comments?: string;
}
