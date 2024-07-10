import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { AppError } from "../utils/error.utils";
import logger from "../utils/logger";
import { MongooseError, Error } from "mongoose";
import { Environment, config } from "../config";

export default async function errorMiddleware(
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // log error to console
    logger.error(error);

    // check for error states
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    const message =
        error instanceof AppError ? error.message : "Internal Server Error";

    return res.status(statusCode).json({ message });
}

// if (error instanceof MongooseError) {
//     // handle all instances of database errors from mongoose
//     switch (error.name) {
//         case "CastError": {
//         }
//     }
// }

// handle other errors
