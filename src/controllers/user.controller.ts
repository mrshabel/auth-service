import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { CreateUserInput } from "../schemas/user.schema";

export async function addOneUser(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await userService.addOneUser(req.body);
        return res.status(201).json({ data: user });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
        // next(error);
    }
}
