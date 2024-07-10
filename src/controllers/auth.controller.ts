import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import * as authService from "../services/auth.service";
import * as sessionService from "../services/session.service";
import { createAccessToken, createRefreshToken } from "../utils/jwt.utils";
import {
    LoginInput,
    LoginRequest,
    SignupInput,
    SignupRequest,
} from "../schemas/auth.schema";
import { validatePassword } from "../utils/password.utils";
import { omit } from "lodash";
import logger from "../utils/logger";
import {
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} from "../config/auth.config";
import { BadRequestError } from "../utils/error.utils";
import { RequestWithSchema } from "../types/request.type";

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
        logger.info(user);

        //TODO: send verification email

        return res.status(201).json({
            message: "Success! A verification link has been sent to your email",
        });
    } catch (error: any) {
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
            return res
                .status(403)
                .json({ message: "Invalid email or password" });
        }

        if (!(await validatePassword(req.body.password, user.password))) {
            return res
                .status(403)
                .json({ message: "Invalid email or password" });
        }

        // TODO: add user permissions

        // issue tokens
        const [accessToken, refreshToken] = await Promise.all([
            createAccessToken({ id: user.id, permissions: ["AppAdmin"] }),
            createRefreshToken({ id: user.id }),
        ]);

        // get user browser agent from headers
        const userAgent = req.headers["user-agent"] || "";
        // create session
        const session = await sessionService.addOneSession({
            userId: user.id,
            userAgent,
            refreshToken,
        });
        logger.info(session);

        // set cookies
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

        return res.status(200).json({
            message: "Login successful",
            data: {
                accessToken,
                refreshToken,
                user: omit(user.toJSON(), "password"),
            },
        });
    } catch (error: any) {
        next(error);
    }
}
