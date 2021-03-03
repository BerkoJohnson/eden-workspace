export interface DATABASE_CONFIG {
  host: string;
  user: string;
  password: string;
  name: string;
  port: number;
}

export interface APP_CONFIG {
  secret: string;
  expiresIn: string | number;
  port: number;
}
