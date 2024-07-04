import { Schema, model } from "mongoose";
import { PermissionDocument } from "../types/permission.type";

const permissionSchema = new Schema<PermissionDocument>(
    {
        name: { type: String, unique: true, required: true },
        description: { type: String, required: true },
        type: { type: String, required: true },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

export const Permission = model<PermissionDocument>(
    "permissions",
    permissionSchema
);
