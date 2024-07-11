import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import * as authService from "../services/auth.service";
import * as sessionService from "../services/session.service";
import { createAccessToken, createRefreshToken } from "../utils/jwt.utils";
import {
    ForgotPasswordRequest,
    LoginRequest,
    LogoutRequest,
    ResetPasswordRequest,
    SignupRequest,
} from "../schemas/auth.schema";
import { validatePassword } from "../utils/password.utils";
import { omit } from "lodash";
import logger from "../utils/logger";
import {
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} from "../config/auth.config";
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from "../utils/error.utils";
import { RequestWithSchema } from "../types/request.type";
import { config } from "../config";

export async function signup(
    req: RequestWithSchema<SignupRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const existingUser = await userService.getOneUserByEmail(
            req.body.email
        );
        if (existingUser) {
            throw new BadRequestError("User already exists");
        }

        const user = await authService.signup(req.body);

        //TODO: send verification email

        return res.status(201).json({
            message: "Success! A verification link has been sent to your email",
        });
    } catch (error) {
        next(error);
    }
}

export async function login(
    req: RequestWithSchema<LoginRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await userService.getOneUserByEmail(req.body.email);
        if (!user) {
            throw new BadRequestError("Invalid email or password");
        }

        if (!(await validatePassword(req.body.password, user.password))) {
            throw new BadRequestError("Invalid email or password");
        }

        const permissions = user.permissions.map(
            (permission) => permission.name
        );

        // issue tokens
        const [accessToken, refreshToken] = await Promise.all([
            createAccessToken({ id: user.id, permissions: permissions }),
            createRefreshToken({ id: user.id }),
        ]);

        // get user browser agent from headers
        const userAgent = req.headers["user-agent"] || "";
        // create session
        const session = await sessionService.addOneSession({
            userId: user.id,
            userAgent,
            refreshToken,
            expiresAt: new Date(
                Date.now() + config.JWT_REFRESH_TOKEN_EXPIRY * 1000
            ),
        });

        // set cookies
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

        return res.status(200).json({
            message: "Login successful",
            data: {
                accessToken,
                refreshToken,
                sessionId: session.id,
                user: omit(
                    user.toJSON(),
                    "password passwordResetToken passwordResetExpires"
                ),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function logout(
    req: RequestWithSchema<LogoutRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        // clear session
        const session = await sessionService.deleteOneSessionById(
            req.body.sessionId
        );

        if (!session) {
            throw new BadRequestError("Failed to logout");
        }

        // reset token
        res.clearCookie("accessToken");

        return res.status(200).json({
            message: "Logout successfully",
        });
    } catch (error) {
        next(error);
    }
}

export async function forgotPassword(
    req: RequestWithSchema<ForgotPasswordRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const existingUser = await userService.getOneUserByEmail(
            req.body.email
        );
        if (!existingUser) {
            throw new BadRequestError("No user found with this email");
        }

        // return response if password has been request recently
        if (
            existingUser.passwordResetExpires &&
            new Date() < new Date(existingUser.passwordResetExpires)
        ) {
            throw new BadRequestError(
                "Password reset link was recently sent to your email"
            );
        }

        // create password reset token
        const resetToken = await authService.forgotPassword(req.body);

        //TODO: send password reset email email

        return res.status(200).json({
            message:
                "Success! A Password reset link has been sent to your email",
            resetToken,
        });
    } catch (error) {
        next(error);
    }
}

export async function resetPassword(
    req: RequestWithSchema<ResetPasswordRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        // reset password
        const user = await authService.resetPassword(req.params, req.body);

        if (!user) {
            throw new UnauthorizedError("Password reset token has expired");
        }

        // log user out of all sessions
        await sessionService.deleteAllSessionsByUserId(user.id);

        return res.status(200).json({
            message: "Password reset successful",
        });
    } catch (error) {
        next(error);
    }
}
