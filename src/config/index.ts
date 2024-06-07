import "dotenv/config";
import { IConfig } from "../types/config";

export enum Environment {
    Development = "development",
    Staging = "staging",
    Production = "production",
}
export const config: IConfig = Object.freeze({
    PORT: process.env.PORT!,
    DATABASE_URL: process.env.DATABASE_URL!,
    NODE_ENV: process.env.NODE_ENV!,
});
