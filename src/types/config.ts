export interface IConfig {
    PORT: string;
    DATABASE_URL: string;
    NODE_ENV: string;
    JWT_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRY: number;
    JWT_REFRESH_TOKEN_EXPIRY: number;
    COOKIE_DOMAIN: string;
    BACKEND_URL: string;
    VERIFICATION_TOKEN_EXPIRY: number;
    PASSWORD_RESET_TOKEN_EXPIRY: number;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_OAUTH_URL: string;
    GOOGLE_OAUTH_TOKEN_URL: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_OAUTH_URL: string;
    GITHUB_OAUTH_TOKEN_URL: string;
    GITHUB_OAUTH_USER_PROFILE_URL: string;
    GITHUB_OAUTH_USER_EMAIL_URL: string;
    BROKER_HOST: string;
    BROKER_PORT: number;
}
