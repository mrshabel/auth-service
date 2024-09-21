import { config } from "../config";
import { SystemDefaultRoleBasedPermissions } from "../config/permissions.config";
import { User } from "../models/user.model";
import {
    ForgotPasswordInput,
    ResetPasswordInput,
    SignupInput,
} from "../schemas/auth.schema";
import {
    createEmailVerificationToken,
    createPasswordResetToken,
    hashPassword,
} from "../utils/password.utils";

export const signup = async function (data: SignupInput["body"]) {
    const password = await hashPassword(data.password);
    const verificationToken = createEmailVerificationToken();

    // assign default 'User' role-permission
    const defaultPermissionIds = [SystemDefaultRoleBasedPermissions.User._id];
    return await User.create({
        ...data,
        password,
        permissions: defaultPermissionIds,
        verificationToken,
        verificationTokenExpiry: new Date(
            Date.now() + config.VERIFICATION_TOKEN_EXPIRY * 1000
        ),
    });
};

export async function updateEmailVerificationToken(email: string) {
    const verificationToken = createEmailVerificationToken();
    await User.findOneAndUpdate(
        { email: email },
        {
            verificationToken: verificationToken,
            verificationTokenExpiry: new Date(
                Date.now() + config.VERIFICATION_TOKEN_EXPIRY * 1000
            ),
        }
    );
    return verificationToken;
}

/**
 *
 * @param data (ForgotPasswordInput)
 * @returns resetToken (string) - the password reset token
 */
export async function forgotPassword(data: ForgotPasswordInput["body"]) {
    const resetToken = createPasswordResetToken();
    await User.findOneAndUpdate(
        { email: data.email },
        {
            passwordResetToken: resetToken,
            passwordResetExpires: new Date(
                Date.now() + config.PASSWORD_RESET_TOKEN_EXPIRY
            ),
        }
    );
    return resetToken;
}

export async function resetPassword(
    params: ResetPasswordInput["params"],
    data: ResetPasswordInput["body"]
) {
    const hashedPassword = await hashPassword(data.password);
    // find user by unique password reset token and update
    return await User.findOneAndUpdate(
        {
            passwordResetToken: params.token,
            passwordResetExpires: { $gt: Date.now() },
        },
        {
            password: hashedPassword,
            passwordResetExpires: null,
            passwordResetToken: null,
        },
        { new: true }
    );
}
