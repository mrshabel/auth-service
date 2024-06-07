import mongoose from "mongoose";
import { UserDocument } from "../types/user.type";

const userSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model<UserDocument>("users", userSchema);
