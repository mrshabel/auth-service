// define cookie configurations here

import { CookieOptions } from "express";
import { Environment, config } from ".";

export const accessTokenCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: config.NODE_ENV != Environment.DEVELOPMENT,
    maxAge: (config.JWT_ACCESS_TOKEN_EXPIRY as number) * 1000,
    domain: config.COOKIE_DOMAIN,
    sameSite: "none", //use none only when server and client have different domains
};

export const refreshTokenCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: config.NODE_ENV != Environment.DEVELOPMENT,
    maxAge: (config.JWT_REFRESH_TOKEN_EXPIRY as number) * 1000,
    domain: config.COOKIE_DOMAIN,
    sameSite: "none", //use none only when server and client have different domains
};
