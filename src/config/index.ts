import "dotenv/config";
import { IConfig } from "../types/config";

export enum Environment {
    DEVELOPMENT = "development",
    STAGING = "staging",
    PRODUCTION = "production",
}
export const config: Readonly<IConfig> = {
    PORT: process.env.PORT!,
    DATABASE_URL: process.env.DATABASE_URL!,
    NODE_ENV: process.env.NODE_ENV!,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_ACCESS_TOKEN_EXPIRY: Number(process.env.JWT_ACCESS_TOKEN_EXPIRY)!,
    JWT_REFRESH_TOKEN_EXPIRY: Number(process.env.JWT_REFRESH_TOKEN_EXPIRY)!,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN!,
    PASSWORD_RESET_TOKEN_EXPIRY: 900000, // 15 minutes
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    GOOGLE_OAUTH_URL: "https://accounts.google.com/o/oauth2/v2/auth",
    GOOGLE_OAUTH_TOKEN_URL: "https://oauth2.googleapis.com/token",
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
    GITHUB_OAUTH_URL: "https://github.com/login/oauth/authorize",
    GITHUB_OAUTH_TOKEN_URL: "https://github.com/login/oauth/access_token",
    GITHUB_OAUTH_USER_PROFILE_URL: "https://api.github.com/user",
    GITHUB_OAUTH_USER_EMAIL_URL: "https://api.github.com/user/emails",
};
