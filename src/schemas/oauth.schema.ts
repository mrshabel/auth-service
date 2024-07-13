import * as z from "zod";

export const googleOAuthSchema = z.object({
    query: z
        .object({
            code: z.string({ required_error: "Code is required" }),
        })
        .required(),
});

export type GoogleOAuthRequestSchema = typeof googleOAuthSchema;
