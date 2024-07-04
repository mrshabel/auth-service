import { AddOneUserInput } from "../schemas/user.schema";
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

// TODO: define type for query
export async function getAllUsers(query: object) {
    return await User.find(query);
}
