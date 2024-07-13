import {
    JsonWebTokenError,
    JwtPayload,
    sign,
    decode,
    verify,
} from "jsonwebtoken";
import { config } from "../config";
import { AccessTokenPayload, RefreshTokenPayload } from "../types/auth.type";
import { GoogleOAuthTokenPayload } from "../types/oauth.type";

export const createAccessToken = async (payload: AccessTokenPayload) =>
    await sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_ACCESS_TOKEN_EXPIRY,
    });

export const createRefreshToken = async (payload: RefreshTokenPayload) =>
    await sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_REFRESH_TOKEN_EXPIRY,
    });

export const decodeAccessToken = async (token: string) => {
    // decode token
    const decodedToken = (await decode(token)) as JwtPayload;
    if (!decodedToken.exp || decodedToken.exp < Date.now() / 1000) {
        throw new JsonWebTokenError("Token has expired");
    }

    // verify token and check that it hasn't been tampered with
    // throws an error by default
    return verify(token, config.JWT_SECRET) as AccessTokenPayload;
};

export const decodeRefreshToken = async (token: string) => {
    // decode token
    const decodedToken = (await decode(token)) as JwtPayload;
    if (!decodedToken.exp || decodedToken.exp < Date.now() / 1000) {
        throw new JsonWebTokenError("Token has expired");
    }

    // verify token and check that it hasn't been tampered with
    // throws an error by default
    return verify(token, config.JWT_SECRET) as RefreshTokenPayload;
};

export const decodeGoogleOAuthToken = async (token: string) => {
    // decode token
    const decodedToken = (await decode(token)) as JwtPayload;

    if (!decodedToken.exp || decodedToken.exp < Date.now() / 1000) {
        throw new JsonWebTokenError("Token has expired");
    }
    // return payload
    return decodedToken as GoogleOAuthTokenPayload & JwtPayload;
};
