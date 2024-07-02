import * as z from "zod";

// reusable schema fields
const sessionIdSchema = z.string({ required_error: "Session ID is required" });
const userIdSchema = z.string({ required_error: "User ID is required" });

// create
export const createSessionSchema = z.object({
    userId: userIdSchema,
    userAgent: z.string({ required_error: "User Agent is required" }),
    refreshToken: z.string({
        required_error: "Refresh token is required",
    }),
});

// read
export const getOneSessionByIdSchema = z.object({
    params: z
        .object({
            id: sessionIdSchema,
        })
        .required(),
});

export const getAllSessionsByUserIdSchema = z.object({
    params: z
        .object({
            userId: userIdSchema,
        })
        .required(),
});

// update
export const updateOneSessionByIdSchema = z.object({
    params: z.object({
        id: sessionIdSchema,
    }),
    body: z
        .object({
            userAgent: z.string().optional(),
            refreshToken: z.string().optional(),
        })
        .required(),
});

// delete
export const deleteOneSessionByIdSchema = z.object({
    params: z
        .object({
            id: sessionIdSchema,
        })
        .required(),
});

export const deleteAllSessionsByUserIdSchema = z.object({
    params: z
        .object({
            userId: userIdSchema,
        })
        .required(),
});

export type CreateSessionInput = z.TypeOf<typeof createSessionSchema>;
export type GetOneSessionByIdInput = z.TypeOf<typeof getOneSessionByIdSchema>;
export type GetOneSessionByUserIdInput = z.TypeOf<
    typeof getAllSessionsByUserIdSchema
>;
export type UpdateOneSessionByIdInput = z.TypeOf<
    typeof updateOneSessionByIdSchema
>;
export type DeleteOneSessionByIdInput = z.TypeOf<
    typeof deleteOneSessionByIdSchema
>;
export type DeleteAllSessionsByUserIdInput = z.TypeOf<
    typeof deleteAllSessionsByUserIdSchema
>;
