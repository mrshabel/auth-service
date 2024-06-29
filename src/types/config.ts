export interface IConfig {
    PORT: string;
    DATABASE_URL: string;
    NODE_ENV: string;
    JWT_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRY: string | number;
    JWT_REFRESH_TOKEN_EXPIRY: string | number;
}
