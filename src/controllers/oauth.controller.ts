import { Request, Response, NextFunction } from "express";
import qs from "qs";
import { RequestWithSchema } from "../types/request.type";
import * as userService from "../services/user.service";
import * as authService from "../services/auth.service";
import * as sessionService from "../services/session.service";
import * as oauthService from "../services/oauth.service";
import {
    createAccessToken,
    createRefreshToken,
    decodeGoogleOAuthToken,
} from "../utils/jwt.utils";
import logger from "../utils/logger";
import {
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} from "../config/auth.config";
import { AppError, UnauthorizedError } from "../utils/error.utils";
import { config } from "../config";
import { OAuthProviders } from "../types/oauth.type";
import {
    GitHubOAuthRequestSchema,
    GoogleOAuthRequestSchema,
} from "../schemas/oauth.schema";
import { getGitHubOAuthURL, getGoogleOAuthURL } from "../utils/oauth.utils";

export async function googleOAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // compose the Google OAuth url
    const redirectURL = `${config.BACKEND_URL}/oauth/google/callback`;
    const googleOAuthURL = getGoogleOAuthURL(redirectURL);

    // redirect the user to the sign in prompt page
    return res.redirect(302, googleOAuthURL);
}

// reference: https://developers.google.com/identity/protocols/oauth2/web-server#node.js_1
export async function googleOAuthCallback(
    req: RequestWithSchema<GoogleOAuthRequestSchema>,
    res: Response,
    next: NextFunction
) {
    // receive authorization code
    const { code } = req.query;

    try {
        const redirectURL = `${config.BACKEND_URL}/oauth/google/callback`;

        // make request for access and refresh token
        const data = await oauthService.getGoogleOAuthTokens({
            redirectURL,
            code: code as string,
        });

        // decode id token (from response) for information or fetch user info from google api
        const tokenData = await decodeGoogleOAuthToken(data.id_token);
        logger.info(tokenData);

        // throw error if email is not verified
        if (!tokenData.email_verified) {
            throw new UnauthorizedError("Google email not verified");
        }

        // create or update the user depending on whether they exist or not
        const user = await userService.upsertOneUserByEmail({
            email: tokenData.email,
            data: {
                email: tokenData.email,
                firstName: tokenData.given_name,
                lastName: tokenData.family_name,
                isActive: true,
                provider: OAuthProviders.Google,
                providerId: tokenData.sub as string,
            },
        });

        const permissions = user.permissions.map(
            (permission) => permission.name
        );

        // create app tokens for the user
        const [accessToken, refreshToken] = await Promise.all([
            createAccessToken({ id: user.id, permissions: permissions }),
            createRefreshToken({ id: user.id }),
        ]);

        // get user browser agent from headers
        const userAgent = req.headers["user-agent"] || "";
        // create session
        const session = await sessionService.addOneSession({
            userId: user.id,
            userAgent,
            refreshToken,
            expiresAt: new Date(
                Date.now() + config.JWT_REFRESH_TOKEN_EXPIRY * 1000
            ),
        });

        // set cookies
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

        // TODO: redirect back to client by creating a url with (access token, refresh token, and session id) as the request query
        const queryParams = qs.stringify({
            accessToken,
            refreshToken,
            sessionId: session.id,
        });

        // return tokens and success response
        return res.status(200).json({
            message: "Login with Google successful",
            data: {
                accessToken,
                refreshToken,
                sessionId: session.id,
                user,
            },
        });
    } catch (error) {
        logger.warn(error);
        const message =
            error instanceof AppError
                ? error.message
                : "Failed to login with google";

        // TODO: redirect back to client error page and append error message to the query params
        const queryParams = qs.stringify({
            error: message,
        });

        if (!(error instanceof AppError)) {
            return res.status(500).json({ message });
        }
        next(error);
    }
}

export async function gitHubOAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // compose the GitHub OAuth url
    const gitHubOAuthURL = getGitHubOAuthURL();

    // redirect the user to the sign in prompt page
    return res.redirect(302, gitHubOAuthURL);
}

export async function gitHubOAuthCallback(
    req: RequestWithSchema<GitHubOAuthRequestSchema>,
    res: Response,
    next: NextFunction
) {
    // receive authorization code
    const { code } = req.query;

    try {
        // make request for access and refresh token
        const tokenData = await oauthService.getGitHubOAuthTokens({
            code,
        });

        // get user data from github users endpoint
        const userData = await oauthService.getGitHubUserProfileByAccessToken(
            tokenData.access_token
        );

        // fetch user email information only if it does not exist in profile ( select the primary email from the options ). Some users may have a setting for hiding their emails from their public github profile ( Turn off public email )
        if (!userData.email) {
            const emailData =
                await oauthService.getGitHubUserEmailByAccessToken(
                    tokenData.access_token
                );

            // select primary user email if it exists
            const primaryEmail = emailData.filter(
                (data) => data.primary && data.verified
            )[0];

            if (!primaryEmail) {
                throw new UnauthorizedError("GitHub email not verified");
            }

            // set profile email as the primary email
            userData.email = primaryEmail.email;
        }

        // create or update the user depending on whether they exist or not
        // github does not give first name and last name so we use the username as the firstName and "" as the lastName until the user updates their profile
        const user = await userService.upsertOneUserByEmail({
            email: userData.email,
            data: {
                email: userData.email,
                firstName: userData.login,
                lastName: "",
                isActive: true,
                provider: OAuthProviders.GitHub,
                providerId: userData.id.toString(),
            },
        });

        const permissions = user.permissions.map(
            (permission) => permission.name
        );

        // create app tokens for the user
        const [accessToken, refreshToken] = await Promise.all([
            createAccessToken({ id: user.id, permissions: permissions }),
            createRefreshToken({ id: user.id }),
        ]);

        // get user browser agent from headers
        const userAgent = req.headers["user-agent"] || "";
        // create session
        const session = await sessionService.addOneSession({
            userId: user.id,
            userAgent,
            refreshToken,
            expiresAt: new Date(
                Date.now() + config.JWT_REFRESH_TOKEN_EXPIRY * 1000
            ),
        });

        // set cookies
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

        // TODO: redirect back to client by creating a url with (access token, refresh token, and session id) as the request query
        const queryParams = qs.stringify({
            accessToken,
            refreshToken,
            sessionId: session.id,
        });

        // return tokens and success response
        return res.status(200).json({
            message: "Login with GitHub successful",
            data: {
                accessToken,
                refreshToken,
                sessionId: session.id,
                user,
            },
        });
    } catch (error) {
        logger.warn(error);
        const message =
            error instanceof AppError
                ? error.message
                : "Failed to login with github";

        // TODO: redirect back to client error page and append error message to the query params
        const queryParams = qs.stringify({
            error: message,
        });

        if (!(error instanceof AppError)) {
            return res.status(500).json({ message });
        }
        next(error);
    }
}
