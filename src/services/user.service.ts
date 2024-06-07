import { CreateUserInput } from "../schemas/user.schema";
import { User } from "../models/user.model";

export async function createUser(data: CreateUserInput["body"]) {
    return await User.create(data);
}
