import jwt from "jsonwebtoken";
import { config } from "../config";

export const createAccessToken = async (payload: object) =>
    await jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_ACCESS_TOKEN_EXPIRY,
    });

export const createRefreshToken = async (payload: object) =>
    await jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_REFRESH_TOKEN_EXPIRY,
    });

export const decodeToken = async (token: string) =>
    await jwt.verify(token, config.JWT_SECRET);
