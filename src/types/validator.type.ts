import { ZodSchema, object as zodObject } from "zod";

export interface RequestBodyValidator extends ZodSchema {
    body?: typeof zodObject;
    params?: typeof zodObject;
    query?: typeof zodObject;
}
