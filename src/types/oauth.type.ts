export enum OAuthProviders {
    Local = "local",
    Google = "google",
}

export interface GoogleOAuthURLParams {
    client_id: string;
    redirect_uri: string;
    prompt: string;
    response_type: string;
    scope: string;
    access_type: string;
    // state: string //TODO: ADD STATE
}

export interface GoogleOAuthTokenRequestBody {
    code: string;
    redirect_uri: string;
    client_id: string;
    client_secret: string;
    grant_type: string; // authorization_code
}

export interface GoogleOAuthTokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
    id_token: string;
}

export interface GoogleOAuthTokenPayload {
    email: string;
    email_verified: boolean;
    at_hash: string; // access token hash
    name: string;
    picture: string;
    given_name: string; // first name
    family_name: string; // last name
}
