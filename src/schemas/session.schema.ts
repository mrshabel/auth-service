import * as z from "zod";

// define the permission groups
export const SessionPermissionGroups = Object.freeze({
    AddSession: "AddSession",
    UpdateSession: "UpdateSession",
    ViewSession: "ViewSession",
    DeleteSession: "DeleteSession",
});

// reusable schema fields
const sessionIdSchema = z.string({ required_error: "Session ID is required" });
const userIdSchema = z.string({ required_error: "User ID is required" });

// create
export const addOneSessionSchema = z.object({
    userId: userIdSchema,
    userAgent: z.string({ required_error: "User Agent is required" }),
    refreshToken: z.string({
        required_error: "Refresh token is required",
    }),
    expiresAt: z.coerce.date({
        required_error: "Expiry time is required",
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

export const getAllSessionsSchema = z.object({
    query: z
        .object({
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
        })
        .required(),
});

export const getAllSessionsByUserIdSchema = z.object({
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

export const refreshSessionSchema = z.object({
    params: z.object({
        id: sessionIdSchema,
    }),
    body: z
        .object({
            refreshToken: z.string({
                required_error: "Refresh token is required",
            }),
        })
        .required(),
});

// define types for request
export type AddOneSessionInput = z.TypeOf<typeof addOneSessionSchema>;
export type AddOneSessionRequest = typeof addOneSessionSchema;

export type GetOneSessionByIdInput = z.TypeOf<typeof getOneSessionByIdSchema>;
export type GetOneSessionByIdRequest = typeof getOneSessionByIdSchema;

export type GetAllSessionsInput = z.TypeOf<typeof getAllSessionsSchema>;
export type GetAllSessionsRequest = typeof getAllSessionsSchema;

export type GetAllSessionsByUserIdInput = z.TypeOf<
    typeof getAllSessionsByUserIdSchema
>;
export type GetAllSessionsByUserIdRequest = typeof getAllSessionsByUserIdSchema;

export type UpdateOneSessionByIdInput = z.TypeOf<
    typeof updateOneSessionByIdSchema
>;
export type UpdateOneSessionByIdRequest = typeof updateOneSessionByIdSchema;

export type DeleteOneSessionByIdInput = z.TypeOf<
    typeof deleteOneSessionByIdSchema
>;
export type DeleteOneSessionByIdRequest = typeof deleteOneSessionByIdSchema;

export type DeleteAllSessionsByUserIdInput = z.TypeOf<
    typeof deleteAllSessionsByUserIdSchema
>;
export type DeleteAllSessionsByUserIdRequest =
    typeof deleteAllSessionsByUserIdSchema;

export type RefreshSessionInput = z.TypeOf<typeof refreshSessionSchema>;
export type RefreshSessionRequest = typeof refreshSessionSchema;
