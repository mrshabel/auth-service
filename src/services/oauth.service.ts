import axios from "axios";
import qs from "qs";
import { BadRequestError } from "../utils/error.utils";
import {
    GitHubOAuthTokenRequestBody,
    GitHubOAuthTokenResponse,
    GitHubOAuthUserEmailResponse,
    GitHubOAuthUserProfileResponse,
    GoogleOAuthTokenRequestBody,
    GoogleOAuthTokenResponse,
} from "../types/oauth.type";
import { config } from "../config";
import logger from "../utils/logger";

// reference link: https://developers.google.com/oauthplayground/?code=4/0ATx3LY6BGR6Tdconk2dtBv5OD5aN7UmFCzNdT7HVnaBtq0Z4r8weZPRdg5DFHQYQxYu1_A&scope=https://www.googleapis.com/auth/calendar

export async function getGoogleOAuthTokens({
    redirectURL,
    code,
}: {
    redirectURL: string;
    code: string;
}) {
    const body: GoogleOAuthTokenRequestBody = {
        code,
        redirect_uri: redirectURL,
        client_id: config.GOOGLE_CLIENT_ID,
        client_secret: config.GOOGLE_CLIENT_SECRET,
        grant_type: "authorization_code",
    };

    try {
        const res = await axios.post(
            config.GOOGLE_OAUTH_TOKEN_URL,
            qs.stringify(body), // qs.stringify generates a url encoded form of the body rather than json
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        return res.data as GoogleOAuthTokenResponse;
    } catch (error: any) {
        console.error(error);
        logger.error("Google login error: " + error.response.data.message);
        throw new BadRequestError("Failed to retrieve google tokens");
    }
}

// reference: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authenticating-to-the-rest-api-with-an-oauth-app#providing-a-callback
export async function getGitHubOAuthTokens({ code }: { code: string }) {
    const body: GitHubOAuthTokenRequestBody = {
        client_id: config.GITHUB_CLIENT_ID,
        client_secret: config.GITHUB_CLIENT_SECRET,
        code,
    };

    try {
        const res = await axios.post(
            config.GITHUB_OAUTH_TOKEN_URL,
            JSON.stringify(body),
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        return res.data as GitHubOAuthTokenResponse;
    } catch (error: any) {
        logger.error("Github login error: " + error.response.data.error);
        throw new BadRequestError("Failed to retrieve github tokens");
    }
}

// reference link on how to make requests: https://developer.github.com/changes/2020-02-10-deprecating-auth-through-query-param/
export async function getGitHubUserProfileByAccessToken(accessToken: string) {
    try {
        const res = await axios.get(config.GITHUB_OAUTH_USER_PROFILE_URL, {
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: "application/json",
            },
        });

        return res.data as GitHubOAuthUserProfileResponse;
    } catch (error: any) {
        logger.error("Github login error: " + error.response.data.message);
        throw new BadRequestError(
            "Failed to retrieve user profile associated with this github account"
        );
    }
}

// reference: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authenticating-to-the-rest-api-with-an-oauth-app#making-authenticated-requests
export async function getGitHubUserEmailByAccessToken(accessToken: string) {
    try {
        const res = await axios.get(config.GITHUB_OAUTH_USER_EMAIL_URL, {
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: "application/json",
            },
        });

        return res.data as Array<GitHubOAuthUserEmailResponse>;
    } catch (error: any) {
        logger.error("Github login error: " + error.response.data.message);
        throw new BadRequestError(
            "Failed to retrieve user email associated with this github account"
        );
    }
}
