import * as sessionService from "../services/session.service";
import { Request, Response, NextFunction } from "express";
import {
    GetOneSessionByIdInput,
    DeleteOneSessionByIdInput,
} from "../schemas/session.schema";
import logger from "../utils/logger";
import { NotFoundError } from "../utils/error.utils";

export async function getAllSessions(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const sessions = await sessionService.getAllSessions();
        return res.status(200).json({
            message: "Sessions successfully retrieved",
            data: sessions,
        });
    } catch (error) {
        next(error);
    }
}

export async function getAllSessionsByUserId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const sessions = await sessionService.getAllSessionsByUserId({
            userId: req.user.id,
        });
        return res.status(200).json({
            message: "Sessions successfully retrieved",
            data: sessions,
        });
    } catch (error) {
        next(error);
    }
}

export async function getOneSessionById(
    req: Request<GetOneSessionByIdInput["params"], {}, {}>,
    res: Response,
    next: NextFunction
) {
    try {
        const session = await sessionService.getOneSessionById(req.params);

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
    req: Request<DeleteOneSessionByIdInput["params"], {}, {}>,
    res: Response,
    next: NextFunction
) {
    try {
        const session = await sessionService.deleteOneSessionById(req.params);

        if (!session) {
            throw new NotFoundError("Session not found");
        }

        return res.status(204).json({
            message: "Sessions successfully retrieved",
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

        return res.status(204).json({
            message: "All user sessions successfully deleted",
        });
    } catch (error) {
        next(error);
    }
}
