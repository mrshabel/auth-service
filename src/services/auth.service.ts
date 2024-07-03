import { LoginInput, SignupInput } from "../schemas/auth.schema";
import { hashPassword } from "../utils/password.utils";
import * as userService from "./user.service";

export const signup = async function (data: SignupInput["body"]) {
    const password = await hashPassword(data.password);
    return await userService.addOneUser({ ...data, password });
};
