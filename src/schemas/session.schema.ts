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
export type AddOneSessionRequest = typeof addOneSessionSchema;
export type AddOneSessionInput = z.infer<AddOneSessionRequest>;

export type GetOneSessionByIdInput = z.infer<typeof getOneSessionByIdSchema>;
export type GetOneSessionByIdRequest = typeof getOneSessionByIdSchema;

export type GetAllSessionsInput = z.infer<GetAllSessionsRequest>;
export type GetAllSessionsRequest = typeof getAllSessionsSchema;

export type GetAllSessionsByUserIdRequest = typeof getAllSessionsByUserIdSchema;
export type GetAllSessionsByUserIdInput =
    z.infer<GetAllSessionsByUserIdRequest>;

export type UpdateOneSessionByIdRequest = typeof updateOneSessionByIdSchema;
export type UpdateOneSessionByIdInput = z.infer<UpdateOneSessionByIdRequest>;

export type DeleteOneSessionByIdRequest = typeof deleteOneSessionByIdSchema;
export type DeleteOneSessionByIdInput = z.infer<DeleteOneSessionByIdRequest>;

export type DeleteAllSessionsByUserIdRequest =
    typeof deleteAllSessionsByUserIdSchema;
export type DeleteAllSessionsByUserIdInput =
    z.infer<DeleteAllSessionsByUserIdRequest>;

export type RefreshSessionRequest = typeof refreshSessionSchema;
export type RefreshSessionInput = z.infer<RefreshSessionRequest>;
