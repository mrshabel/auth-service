import { Session } from "../models/session.model";
import {
    AddOneSessionInput,
    GetAllSessionsByUserIdInput,
    GetAllSessionsInput,
    UpdateOneSessionByIdInput,
} from "../schemas/session.schema";

export async function addOneSession(data: AddOneSessionInput) {
    return await Session.create(data);
}

export async function getOneSessionById(id: string) {
    return await Session.findById(id);
}

export async function getOneSessionByRefreshToken(
    id: string,
    refreshToken: string
) {
    return await Session.findOne({ _id: id, refreshToken });
}

export async function getAllSessions(query: GetAllSessionsInput["query"]) {
    const { skip, limit, ...search } = query;

    // construct the search query
    const searchQuery = { ...search };

    // fetch records count and data
    const [total, data] = await Promise.all([
        Session.countDocuments(searchQuery),
        Session.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
    ]);
    return { total, data };
}

export async function getAllSessionsByUserId(
    userId: string,
    query: GetAllSessionsByUserIdInput["query"]
) {
    const { skip, limit, ...search } = query;

    // construct the search query
    const searchQuery = { ...search, userId };

    // fetch records count and data
    const [total, data] = await Promise.all([
        Session.countDocuments(searchQuery),
        Session.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
    ]);
    return { total, data };
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

// delete all expired sessions
/**
 * Deletes all expired sessions
 * @returns the an object representing the deleted sessions
 */
export async function deleteAllExpiredSessions() {
    return await Session.deleteMany({ expiresAt: { $lt: new Date() } });
}
