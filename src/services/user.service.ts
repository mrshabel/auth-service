import { CreateUserInput } from "../schemas/user.schema";
import { User } from "../models/user.model";

export async function addOneUser(data: CreateUserInput["body"]) {
    return await User.create(data);
}

export async function getOneUserById(id: string) {
    return await User.findById(id);
}

export async function getOneUserByEmail(email: string) {
    return await User.findOne({ email });
}

// TODO: define type for query
export async function getAllUsers(query: unknown) {
    return await User.create(query);
}
