export type AccessTokenPayload = {
    id: string;
    permissions: Array<string>;
};

export type RefreshTokenPayload = {
    id: string;
};
