import * as sessionService from "../services/session.service";
import * as userService from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import {
    GetAllSessionsRequest,
    GetOneSessionByIdRequest,
    DeleteOneSessionByIdRequest,
    GetAllSessionsByUserIdRequest,
    RefreshSessionRequest,
} from "../schemas/session.schema";
import { AppError, BadRequestError, NotFoundError } from "../utils/error.utils";
import { RequestWithSchema } from "../types/request.type";
import { createAccessToken, decodeRefreshToken } from "../utils/jwt.utils";
import { JsonWebTokenError } from "jsonwebtoken";
import { accessTokenCookieOptions } from "../config/auth.config";

export async function getAllSessions(
    req: RequestWithSchema<GetAllSessionsRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const { data, total } = await sessionService.getAllSessions(req.query);
        return res.status(200).json({
            message: "Sessions successfully retrieved",
            data,
            total,
        });
    } catch (error) {
        next(error);
    }
}

// user id will be injected into the controller by the middleware
export async function getAllSessionsByUserId(
    req: RequestWithSchema<GetAllSessionsByUserIdRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const { data, total } = await sessionService.getAllSessionsByUserId(
            req.user.id,
            req.query
        );

        return res.status(200).json({
            message: "Sessions successfully retrieved",
            data,
            total,
        });
    } catch (error) {
        next(error);
    }
}

export async function getOneSessionById(
    req: RequestWithSchema<GetOneSessionByIdRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const session = await sessionService.getOneSessionById(req.params.id);

        if (!session) {
            throw new NotFoundError("Session not found");
        }

        return res
            .status(200)
            .json({ message: "Session successfully retrieved", data: session });
    } catch (error) {
        next(error);
    }
}

export async function deleteOneSessionById(
    req: RequestWithSchema<DeleteOneSessionByIdRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const session = await sessionService.deleteOneSessionById(
            req.params.id
        );

        if (!session) {
            throw new NotFoundError("Session not found");
        }

        return res.status(204).json({
            message: "Sessions successfully deleted",
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteAllSessionsByUserId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        // delete all sessions except current logged in session
        const userId = req.user.id;
        const userAgent = req.headers["user-agent"] || "";
        await sessionService.deleteAllSessionsExceptCurrentByUserId(
            userId,
            userAgent
        );

        return res.status(200).json({
            message: "All user sessions successfully deleted",
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteAllExpiredSessions(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        // delete all expired sessions
        await sessionService.deleteAllExpiredSessions();

        return res
            .status(200)
            .json({ message: "All expired sessions successfully deleted" });
    } catch (error) {
        next(error);
    }
}

// refresh session
export async function refreshSession(
    req: RequestWithSchema<RefreshSessionRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        // fetch current session with refresh token
        const session = await sessionService.getOneSessionByRefreshToken(
            req.params.id,
            req.body.refreshToken
        );

        if (!session) {
            throw new NotFoundError("Invalid session");
        }

        // validate refresh token
        await decodeRefreshToken(session.refreshToken);

        // retrieve related user record
        const user = await userService.getOneUserById(session.userId);

        if (!user) {
            throw new NotFoundError("No user found with current session");
        }

        const permissions = user.permissions.map(
            (permission) => permission.name
        );

        // reissue access token
        const accessToken = await createAccessToken({
            id: user.id,
            permissions: permissions,
        });

        res.cookie("accessToken", accessToken, accessTokenCookieOptions);

        return res
            .status(200)
            .json({ message: "Session refreshed successfully", accessToken });
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return next(
                new BadRequestError("Session has expired. Please login again")
            );
        }

        next(error);
    }
}
