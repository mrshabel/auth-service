export enum OAuthProviders {
    Local = "local",
    Google = "google",
    GitHub = "github",
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

// github
export interface GitHubOAuthURLParams {
    client_id: string;
    scope: string;
}

export interface GitHubOAuthTokenRequestBody {
    client_id: string;
    client_secret: string;
    code: string;
}

export interface GitHubOAuthTokenResponse {
    access_token: string;
    token_type: string;
    scope: string;
}

export interface GitHubOAuthTokenPayload {
    email: string;
    email_verified: boolean;
    at_hash: string; // access token hash
    name: string;
    picture: string;
    given_name: string; // first name
    family_name: string; // last name
}

export interface GitHubOAuthUserProfileResponse {
    login: string; // username
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string; // account type. eg: User
    site_admin: boolean;
    name: string | null; // name may be null if not set on github
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    hireable: string | null;
    bio: string | null;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface GitHubOAuthUserEmailResponse {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility: string | null;
}
