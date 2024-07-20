import qs from "qs";
import { config } from "../config";
import {
    GitHubOAuthURLParams,
    GoogleOAuthURLParams,
} from "../types/oauth.type";

// reference url from google playground: Location: `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=&access_type=offline`

// reference url for google oauth2 scopes: https://developers.google.com/identity/protocols/oauth2

export function getGoogleOAuthURL(redirectURL: string) {
    // custom redirect url can be fetched from data source or config object
    const url = config.GOOGLE_OAUTH_URL;

    // define client options, redirect url and scopes
    const params: GoogleOAuthURLParams = {
        client_id: config.GOOGLE_CLIENT_ID,
        redirect_uri: redirectURL,
        prompt: "consent",
        response_type: "code",
        scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        access_type: "offline",
    };

    const query = qs.stringify(params);

    return `${url}?${query}`;
}

// reference url for github oauth integration: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authenticating-to-the-rest-api-with-an-oauth-app
export function getGitHubOAuthURL() {
    // custom redirect url can be fetched from data source or config object
    const url = config.GITHUB_OAUTH_URL;

    // define client id and scopes
    const params: GitHubOAuthURLParams = {
        client_id: config.GITHUB_CLIENT_ID,
        scope: "user:email",
    };

    const query = qs.stringify(params);

    return `${url}?${query}`;
}
