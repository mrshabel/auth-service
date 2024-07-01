import { DocumentBase } from "./documentBase";

// define db document schema
export interface UserDocument extends DocumentBase {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isLocked: boolean;
    passwordResetToken: string;
    passwordResetExpires: Date | string;
}
