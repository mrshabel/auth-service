import * as sessionService from "../services/session.service";
import { Request, Response, NextFunction } from "express";
import {
    GetAllSessionsRequest,
    GetOneSessionByIdRequest,
    DeleteOneSessionByIdRequest,
    GetAllSessionsByUserIdRequest,
} from "../schemas/session.schema";
import { NotFoundError } from "../utils/error.utils";
import { RequestWithSchema } from "../types/request.type";

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
        await sessionService.deleteAllSessionsByUserId(userId, userAgent);

        return res.status(200).json({
            message: "All user sessions successfully deleted",
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteAllStaleSessions(
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
