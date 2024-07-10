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
        req.user = payload;
    } catch (error) {
        logger.error(error);
        return res.status(401).json({ message: "Session has expired" });
    }
    next();
}

/**
 * Accepts a list of user permissions and checks if a user has permission to perform a request
 * @param permissions
 * @returns
 */
// define function to check for user permissions
export function hasPermission(permissions: Array<string>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            return res.status(201).json({
                message: "You must be logged in to perform this action",
            });
        }

        const permissionsSet = new Set(permissions);

        const userPermissions = new Set(req.user.permissions);
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
