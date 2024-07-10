import jwt from "jsonwebtoken";
import { config } from "../config";
import { AccessTokenPayload, RefreshTokenPayload } from "../types/auth.type";

export const createAccessToken = async (payload: AccessTokenPayload) =>
    await jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_ACCESS_TOKEN_EXPIRY,
    });

export const createRefreshToken = async (payload: RefreshTokenPayload) =>
    await jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_REFRESH_TOKEN_EXPIRY,
    });

export const decodeAccessToken = async (token: string) =>
    (await jwt.verify(token, config.JWT_SECRET)) as AccessTokenPayload;

export const decodeRefreshToken = async (token: string) =>
    (await jwt.verify(token, config.JWT_SECRET)) as RefreshTokenPayload;
