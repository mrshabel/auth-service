import { Request, Response, NextFunction } from "express";
import { RequestWithSchema } from "../types/request.type";
import { GetAllUsersRequest } from "../schemas/user.schema";
import * as userService from "../services/user.service";

export async function addOneUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return res.status(503).json({ message: "Please use the signup route" });
}

export async function getAllUsers(
    req: RequestWithSchema<GetAllUsersRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const { data, total } = await userService.getAllUsers(req.query);
        return res.status(200).json({
            message: "Users successfully retrieved",
            data,
            total,
        });
    } catch (error) {
        next(error);
    }
}
