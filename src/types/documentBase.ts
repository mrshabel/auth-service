import mongoose from "mongoose";

export interface DocumentBase extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
