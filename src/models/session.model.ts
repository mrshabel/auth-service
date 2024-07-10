import { Schema, model, Types } from "mongoose";
import { SessionDocument } from "../types/session.type";

const sessionSchema = new Schema<SessionDocument>(
    {
        userId: { type: Types.ObjectId, ref: "users" },
        userAgent: { type: String, required: true },
        refreshToken: { type: String, required: true },
        expiresAt: { type: Date, required: true },
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

export const Session = model<SessionDocument>("sessions", sessionSchema);
