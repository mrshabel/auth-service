import { AddOneUserInput, GetAllUsersInput } from "../schemas/user.schema";
import { User } from "../models/user.model";

export async function addOneUser(data: AddOneUserInput["body"]) {
    return await User.create(data);
}

export async function getOneUserById(id: string) {
    return await User.findById(id);
}

export async function getOneUserByEmail(email: string) {
    return await User.findOne({ email }).select("+password");
}

export async function getAllUsers(query: GetAllUsersInput["query"]) {
    const { skip, limit, ...search } = query;

    // construct the search query
    const searchQuery = { ...search };

    // fetch records count and data
    const [total, data] = await Promise.all([
        User.countDocuments(searchQuery),
        User.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("permissions", "-_id name"),
    ]);
    return { total, data };
}
