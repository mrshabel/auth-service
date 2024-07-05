import { SystemDefaultRoleBasedPermissions } from "../config/permissions.config";
import { User } from "../models/user.model";
import { SignupInput } from "../schemas/auth.schema";
import { hashPassword } from "../utils/password.utils";

export const signup = async function (data: SignupInput["body"]) {
    const password = await hashPassword(data.password);

    // assign default 'User' role-permission
    const defaultPermissionIds = [SystemDefaultRoleBasedPermissions.User._id];
    return await User.create({
        ...data,
        password,
        permissions: defaultPermissionIds,
    });
};
