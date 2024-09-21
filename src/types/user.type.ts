import { DocumentBase } from "./documentBase";
import { OAuthProviders } from "./oauth.type";
import { PermissionDocument } from "./permission.type";

// define db document schema
export interface UserDocument extends DocumentBase {
    email: string;
    password: string;
    permissions: Array<PermissionDocument["id"]>;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isLocked: boolean;
    provider: OAuthProviders;
    providerId?: string;
    verificationToken: string;
    verificationTokenExpiry: Date | string;
    passwordResetToken: string;
    passwordResetExpires: Date | string;
}
