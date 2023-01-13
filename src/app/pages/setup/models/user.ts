import { FunctionEnum } from '@pages/setup/models/function';

export interface User {
  id?: number;
  name?: string;
  nickname?: string;
  password?: string;
  active?: boolean;
  function?: FunctionEnum;
  createdDate?: Date;
  lastUpdate?: Date;
}
