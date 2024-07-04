import * as z from "zod";
import { PermissionType } from "../types/permission.type";

// define the permission groups
export const PermissionGroups = Object.freeze({
    AddPermission: "AddPermission",
    UpdatePermission: "UpdatePermission",
    ViewPermission: "ViewPermission",
    DeletePermission: "DeletePermission",
});

// reusable schema fields
const permissionIdSchema = z.string({
    required_error: "Permission ID is required",
});

export const addOnePermissionSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }),
        description: z.string({ required_error: "Description is required" }),
        type: z.nativeEnum(PermissionType),
    }),
});

export const updateOnePermissionByIdSchema = z.object({
    params: z.object({
        id: permissionIdSchema,
    }),
    body: z.object({
        name: z.string({ required_error: "Name is required" }),
        description: z.string({ required_error: "Description is required" }),
        type: z.enum([PermissionType.ROLE, PermissionType.ACTION]),
    }),
});

export const getOnePermissionByIdSchema = z.object({
    params: z.object({
        id: permissionIdSchema,
    }),
});

export const getAllPermissionsSchema = z.object({
    // add potential query params
    query: z.object({
        skip: z
            .number()
            .min(0, "Skip should be at least 0")
            .optional()
            .default(0),
        limit: z
            .number()
            .min(1, "Limit should be at least 1")
            .optional()
            .default(10),
    }),
});

export const deleteOnePermissionByIdSchema = z.object({
    params: z.object({
        id: permissionIdSchema,
    }),
});

export type AddOnePermissionInput = z.TypeOf<typeof addOnePermissionSchema>;
export type GetOnePermissionByIdInput = z.TypeOf<
    typeof getOnePermissionByIdSchema
>;
export type UpdateOnePermissionByIdInput = z.TypeOf<
    typeof updateOnePermissionByIdSchema
>;
export type DeleteOnePermissionByIdInput = z.TypeOf<
    typeof deleteOnePermissionByIdSchema
>;
