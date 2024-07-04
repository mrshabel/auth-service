import { Session } from "../models/session.model";
import {
    AddOneSessionInput,
    UpdateOneSessionByIdInput,
} from "../schemas/session.schema";

export async function addOneSession(data: AddOneSessionInput) {
    return await Session.create(data);
}

export async function getOneSessionById(id: string) {
    return await Session.findById(id);
}

export async function getAllSessions() {
    return await Session.find();
}

export async function getAllSessionsByUserId(userId: string) {
    return await Session.find({ userId });
}

export async function updateOneSessionById(
    id: string,
    data: UpdateOneSessionByIdInput["body"]
) {
    return await Session.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteOneSessionById(id: string) {
    return await Session.findByIdAndDelete(id);
}

/**
 * Deletes all device sessions user has except currently logged in device
 * @param userId
 * @param userAgent
 * @returns Promise<SessionDocument>
 */
export async function deleteAllSessionsByUserId(
    userId: string,
    userAgent: string
) {
    return await Session.deleteMany({
        userId,
        userAgent: { $not: { $eq: userAgent } },
    });
}
