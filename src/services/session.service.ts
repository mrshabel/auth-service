import { Session } from "../models/session.model";
import {
    CreateSessionInput,
    DeleteAllSessionsByUserIdInput,
    DeleteOneSessionByIdInput,
    GetOneSessionByIdInput,
    GetOneSessionByUserIdInput,
    UpdateOneSessionByIdInput,
} from "../schemas/session.schema";

export async function addOneSession(data: CreateSessionInput) {
    return await Session.create(data);
}

export async function getOneSessionById(
    params: GetOneSessionByIdInput["params"]
) {
    return await Session.findById(params.id);
}

export async function getAllSessions() {
    return await Session.find();
}

export async function getAllSessionsByUserId(
    params: GetOneSessionByUserIdInput["params"]
) {
    return await Session.find({ userId: params.userId });
}

export async function updateOneSessionById(
    params: UpdateOneSessionByIdInput["params"],
    data: UpdateOneSessionByIdInput["body"]
) {
    return await Session.findByIdAndUpdate(params.id, data, { new: true });
}

export async function deleteOneSessionById(
    params: DeleteOneSessionByIdInput["params"]
) {
    return await Session.findByIdAndDelete(params.id);
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
