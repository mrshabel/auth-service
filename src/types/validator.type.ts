import { AnyZodObject, ZodSchema } from "zod";

export interface RequestValidator extends ZodSchema {
    body?: AnyZodObject;
    params?: AnyZodObject;
    query?: AnyZodObject;
}
