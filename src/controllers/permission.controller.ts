import { NextFunction, Request, Response } from "express";
import {
    GetAllPermissionsRequest,
    AddOnePermissionRequest,
    GetOnePermissionByIdRequest,
    UpdateOnePermissionByIdRequest,
    DeleteOnePermissionByIdRequest,
} from "../schemas/permission.schema";
import * as permissionService from "../services/permission.service";
import { NotFoundError } from "../utils/error.utils";
import { RequestWithSchema } from "../types/request.type";

// create
export async function addOnePermission(
    req: RequestWithSchema<AddOnePermissionRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const permission = await permissionService.addOnePermission(req.body);
        return res.status(201).json({
            message: "Permission added successfully",
            data: permission,
        });
    } catch (error) {
        next(error);
    }
}

// read
export async function getOnePermissionById(
    req: RequestWithSchema<GetOnePermissionByIdRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const permission = await permissionService.getOnePermissionById(
            req.params.id
        );

        if (!permission) {
            throw new NotFoundError("Permission not found");
        }

        return res.status(200).json({
            message: "Permission successfully retrieved",
            data: permission,
        });
    } catch (error) {
        next(error);
    }
}

export async function getAllPermissions(
    req: RequestWithSchema<GetAllPermissionsRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const permissions = await permissionService.getAllPermissions(
            req.query
        );

        return res.status(200).json({
            message: "Permissions successfully retrieved",
            data: permissions,
        });
    } catch (error) {
        next(error);
    }
}

// update
export async function updateOnePermissionById(
    req: RequestWithSchema<UpdateOnePermissionByIdRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const permission = await permissionService.updateOnePermissionById(
            req.params.id,
            req.body
        );

        if (!permission) {
            throw new NotFoundError("Permission not found");
        }

        return res.status(201).json({
            message: "Permission successfully updated",
            data: permission,
        });
    } catch (error) {
        next(error);
    }
}

// delete

export async function deleteOnePermissionById(
    req: RequestWithSchema<DeleteOnePermissionByIdRequest>,
    res: Response,
    next: NextFunction
) {
    try {
        const permission = await permissionService.deleteOnePermissionById(
            req.params.id
        );

        if (!permission) {
            throw new NotFoundError("Permission not found");
        }

        return res.status(201).json({
            message: "Permission successfully deleted",
        });
    } catch (error) {
        next(error);
    }
}
