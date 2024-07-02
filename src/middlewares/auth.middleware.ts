import { NextFunction, Request, Response } from "express";
import { decodeAccessToken } from "../utils/jwt.utils";
import logger from "../utils/logger";

// define function to check for user authentication status
export async function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // check if token is present in headers or cookies
    const token =
        req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized. You need login to perform this request",
        });
    }

    // verify token
    try {
        const payload = await decodeAccessToken(token);
        console.log(payload);
        req.user = payload;
    } catch (error) {
        logger.error(error);
        return res.status(401).json({ message: "Session has expired" });
    }
    next();
}

// define function to check for user permissions
export async function hasPermissions(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return function (permissions: Array<string>) {
        const permissionsSet = new Set(permissions);
        // TODO: add roles when implemented
        const userPermissions = new Set(["User", "Admin"]);
        let isAuthorized = false;

        // check for permission
        permissionsSet.forEach((permission) => {
            if (userPermissions.has(permission)) {
                isAuthorized = true;
                return;
            }
        });

        if (!isAuthorized) {
            return res.status(403).json({
                message: "You are not allowed to perform this action",
            });
        }
        next();
    };
}
