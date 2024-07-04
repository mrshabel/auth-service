/**
 * @summary: validating request resource body, params, and query
 * @param:
 *  - schema<T>: accepts the schema of the req body, params, query
 * @returns
 *  - void: passes the request on to the next middleware
 */

import { NextFunction, Request, Response } from "express";
import { RequestBodyValidator } from "../types/validator.type";

export default function validate(schema: RequestBodyValidator) {
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

        // modify request parameters to accept validated inputs
        if (result.data.body) req.body = result.data.body;
        if (result.data.params) req.params = result.data.params;
        if (result.data.query) req.query = result.data.query;

        next();
    };
}
