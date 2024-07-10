import { Request } from "express";
import { ParsedQs } from "qs";
import * as z from "zod";

/**
 * Extends the Express Request type with strongly-typed properties based on a Zod schema.
 */
type RequestWithSchema<T extends z.ZodType<any>> = Request<
    z.TypeOf<T> extends { params: infer P } ? P : {},
    {},
    z.TypeOf<T> extends { body: infer B } ? B : {},
    z.TypeOf<T> extends { query: infer Q } ? Q & ParsedQs : ParsedQs
>;

export { RequestWithSchema };
