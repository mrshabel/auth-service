import { DocumentBase } from "./documentBase";
import { UserDocument } from "./user.type";

// define db interface from document schema
export interface SessionDocument extends DocumentBase {
    userId: UserDocument["id"];
    userAgent: string; //browser information
    refreshToken: string;
    expiresAt: Date;
}
