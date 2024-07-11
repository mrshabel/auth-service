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
};
