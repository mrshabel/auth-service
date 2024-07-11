import { Router } from "express";
import validate from "../middlewares/validateResource";
import {
    getAllPermissionsSchema,
    getOnePermissionByIdSchema,
    addOnePermissionSchema,
    updateOnePermissionByIdSchema,
    deleteOnePermissionByIdSchema,
    PermissionGroups,
} from "../schemas/permission.schema";
import {
    addOnePermission,
    getAllPermissions,
    getOnePermissionById,
    updateOnePermissionById,
    deleteOnePermissionById,
} from "../controllers/permission.controller";
import { hasPermission, requireAuth } from "../middlewares/auth.middleware";
import { RoleBasedPermissionGroups } from "../schemas/shared.schema";

const router = Router();

// require authentication
router.use(requireAuth);

router.post(
    "/",
    hasPermission([
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.Admin,
        PermissionGroups.AddPermission,
    ]),
    validate(addOnePermissionSchema),
    addOnePermission
);

router.get(
    "/",
    hasPermission([
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.Admin,
        PermissionGroups.ViewPermission,
    ]),
    validate(getAllPermissionsSchema),
    getAllPermissions
);

router.get(
    "/:id",
    hasPermission([
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.Admin,
        PermissionGroups.ViewPermission,
    ]),
    validate(getOnePermissionByIdSchema),
    getOnePermissionById
);

router.patch(
    "/:id",
    hasPermission([
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.Admin,
        PermissionGroups.UpdatePermission,
    ]),
    validate(updateOnePermissionByIdSchema),
    updateOnePermissionById
);

// restrict to only system administrators
router.delete(
    "/:id",
    hasPermission([RoleBasedPermissionGroups.AppAdmin]),
    validate(deleteOnePermissionByIdSchema),
    deleteOnePermissionById
);

export default router;
