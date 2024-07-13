import * as z from "zod";
import { OAuthProviders } from "../types/oauth.type";

export const addOneUserSchema = z.object({
    body: z
        .object({
            email: z
                .string({ required_error: "Email is required" })
                .email({ message: "Not a valid email" }),
            password: z.string({ required_error: "Password is required" }),
            firstName: z.string({ required_error: "First Name is required" }),
            lastName: z.string({ required_error: "Last Name is required" }),
        })
        .required(),
});

export const getAllUsersSchema = z.object({
    query: z.object({
        skip: z.coerce
            .number()
            .min(0, "Skip should be at least 0")
            .optional()
            .default(0),
        limit: z.coerce
            .number()
            .min(1, "Limit should be at least 1")
            .optional()
            .default(10),
    }),
});

export const upsertOneUserByEmailSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Not a valid email" }),
    data: z
        .object({
            email: z
                .string({ required_error: "Email is required" })
                .email({ message: "Not a valid email" }),
            firstName: z.string({ required_error: "First Name is required" }),
            lastName: z.string({ required_error: "Last Name is required" }),
            isActive: z.coerce.boolean().default(true),
            provider: z.nativeEnum(OAuthProviders),
            providerId: z.string({ required_error: "Provider ID is required" }),
        })
        .required(),
});

// define request types
export type AddOneUserRequest = typeof addOneUserSchema;
export type AddOneUserInput = z.TypeOf<AddOneUserRequest>;

export type GetAllUsersRequest = typeof getAllUsersSchema;
export type GetAllUsersInput = z.TypeOf<GetAllUsersRequest>;

export type UpsertOneUserByEmailInput = z.TypeOf<
    typeof upsertOneUserByEmailSchema
>;
