import { Router } from "express";
import validate from "../middlewares/validateResource";
import {
    getOneSessionByIdSchema,
    deleteOneSessionByIdSchema,
    getAllSessionsSchema,
    getAllSessionsByUserIdSchema,
    deleteAllSessionsByUserIdSchema,
} from "../schemas/session.schema";
import {
    getAllSessions,
    getAllSessionsByUserId,
    getOneSessionById,
    deleteAllSessionsByUserId,
    deleteOneSessionById,
} from "../controllers/session.controller";
import { hasPermission, requireAuth } from "../middlewares/auth.middleware";
import { RoleBasedPermissionGroups } from "../schemas/shared.schema";
import { deleteAllExpiredSessions } from "../services/session.service";

const router = Router();

// require authentication
router.use(requireAuth);

router.get(
    "/sessions",
    validate(getAllSessionsSchema),
    hasPermission([
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.Admin,
    ]),
    getAllSessions
);

router.get(
    "/sessions/me",
    validate(getAllSessionsByUserIdSchema),
    hasPermission([
        RoleBasedPermissionGroups.Admin,
        RoleBasedPermissionGroups.AuthBase,
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.User,
    ]),
    getAllSessionsByUserId
);
router.delete(
    "/sessions/me",
    validate(deleteAllSessionsByUserIdSchema),
    hasPermission([
        RoleBasedPermissionGroups.Admin,
        RoleBasedPermissionGroups.AuthBase,
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.User,
    ]),
    deleteAllSessionsByUserId
);

router.delete(
    "/sessions/expired",
    hasPermission([RoleBasedPermissionGroups.AppAdmin]),
    deleteAllExpiredSessions
);

router.get(
    "/sessions/:id",
    validate(getOneSessionByIdSchema),
    hasPermission([
        RoleBasedPermissionGroups.Admin,
        RoleBasedPermissionGroups.AuthBase,
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.User,
    ]),
    getOneSessionById
);
router.delete(
    "/sessions/:id",
    validate(deleteOneSessionByIdSchema),
    hasPermission([
        RoleBasedPermissionGroups.Admin,
        RoleBasedPermissionGroups.AuthBase,
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.User,
    ]),
    deleteOneSessionById
);

export default router;
