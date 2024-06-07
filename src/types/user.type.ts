import { DocumentBase } from "./documentBase";

// define db document schema
export interface UserDocument extends DocumentBase {
    email: string;
    password: string;
}
