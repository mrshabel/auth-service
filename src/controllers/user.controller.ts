import { Request, Response, NextFunction } from "express";

export async function addOneUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return res.status(503).json({ message: "Please use the signup route" });
}
