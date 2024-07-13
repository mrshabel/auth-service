import axios from "axios";
import qs from "qs";
import { BadRequestError } from "../utils/error.utils";
import {
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
            qs.stringify(body),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        return res.data as GoogleOAuthTokenResponse;
    } catch (error: any) {
        logger.error("Google login error: " + error.response.data);
        throw new BadRequestError("Failed to retrieve google tokens");
    }
}
