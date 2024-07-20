import * as z from "zod";

export const googleOAuthCallbackSchema = z.object({
    query: z
        .object({
            code: z.string({ required_error: "Code is required" }),
        })
        .required(),
});

export const gitHubOAuthCallbackSchema = z.object({
    query: z
        .object({
            code: z.string({ required_error: "Code is required" }),
        })
        .required(),
});

export type GoogleOAuthRequestSchema = typeof googleOAuthCallbackSchema;
export type GitHubOAuthRequestSchema = typeof gitHubOAuthCallbackSchema;
