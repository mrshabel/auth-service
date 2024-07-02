export interface IConfig {
    PORT: string;
    DATABASE_URL: string;
    NODE_ENV: string;
    JWT_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRY: number;
    JWT_REFRESH_TOKEN_EXPIRY: number;
    COOKIE_DOMAIN: string;
}
