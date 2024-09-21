import { Schema, model, Types } from "mongoose";
import { UserDocument } from "../types/user.type";
import { OAuthProviders } from "../types/oauth.type";

const userSchema = new Schema<UserDocument>(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true, select: false },
        permissions: [{ type: Types.ObjectId, ref: "permissions" }],
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        isActive: { type: Boolean, required: true, default: false },
        isLocked: { type: Boolean, required: true, default: false },
        provider: {
            type: String,
            enum: Object.values(OAuthProviders),
            default: OAuthProviders.Local,
        },
        providerId: { type: String },
        verificationToken: { type: String, select: false },
        verificationTokenExpiry: { type: Date, select: false },
        passwordResetToken: { type: String, select: false },
        passwordResetExpires: { type: Date, select: false },
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

userSchema;

export const User = model<UserDocument>("users", userSchema);
