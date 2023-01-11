export interface JwtDTO {
  token: string;

  prefix: string;

  expiry: number;

  createdDate: Date;
}
