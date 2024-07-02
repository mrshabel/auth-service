/**
 * @summary: validating request resource body, params, and query
 * @param:
 *  - schema<T>: accepts the schema of the req body, params, query
 * @returns
 *  - void: passes the request on to the next middleware
 */

import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export default function validate(schema: ZodSchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        if (result.error) {
            return res.status(422).json({
                message: result.error.errors[0].message,
            });
        }

        next();
    };
}
