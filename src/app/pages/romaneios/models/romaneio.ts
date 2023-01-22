import { RomaneioStatus } from '@pages/romaneios/models/romaneio-status';

export interface Romaneio {
  id?: number;
  name?: string;
  status?: RomaneioStatus;
  active?: boolean;
  statusDate?: Date;
  createdDate?: Date;
  lastUpdate?: Date;
  comments?: string;
}
