import { DocumentBase } from "./documentBase";

export enum PermissionType {
    ROLE = "ROLE",
    ACTION = "ACTION",
}

export interface PermissionDocument extends DocumentBase {
    name: string;
    description: string;
    type: PermissionType;
}
