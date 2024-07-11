import { Router } from "express";
import validate from "../middlewares/validateResource";
import {
    getOneSessionByIdSchema,
    deleteOneSessionByIdSchema,
    getAllSessionsSchema,
    getAllSessionsByUserIdSchema,
    deleteAllSessionsByUserIdSchema,
    refreshSessionSchema,
    SessionPermissionGroups,
} from "../schemas/session.schema";
import {
    getAllSessions,
    getAllSessionsByUserId,
    getOneSessionById,
    deleteAllSessionsByUserId,
    deleteOneSessionById,
    refreshSession,
    deleteAllExpiredSessions,
} from "../controllers/session.controller";
import { hasPermission, requireAuth } from "../middlewares/auth.middleware";
import { RoleBasedPermissionGroups } from "../schemas/shared.schema";

const router = Router();

// no authentication required
router.post("/:id/refresh", validate(refreshSessionSchema), refreshSession);

// require authentication
router.use(requireAuth);

router.get(
    "/",
    validate(getAllSessionsSchema),
    hasPermission([
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.Admin,
        SessionPermissionGroups.ViewSession,
    ]),
    getAllSessions
);

router.get(
    "/me",
    validate(getAllSessionsByUserIdSchema),
    hasPermission([
        RoleBasedPermissionGroups.Admin,
        RoleBasedPermissionGroups.AuthBase,
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.User,
        SessionPermissionGroups.ViewSession,
    ]),
    getAllSessionsByUserId
);
router.delete(
    "/me",
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
    "/expired",
    hasPermission([
        RoleBasedPermissionGroups.AppAdmin,
        SessionPermissionGroups.DeleteSession,
    ]),
    deleteAllExpiredSessions
);

router.get(
    "/:id",
    validate(getOneSessionByIdSchema),
    hasPermission([
        RoleBasedPermissionGroups.Admin,
        RoleBasedPermissionGroups.AuthBase,
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.User,
        SessionPermissionGroups.ViewSession,
    ]),
    getOneSessionById
);
router.delete(
    "/:id",
    validate(deleteOneSessionByIdSchema),
    hasPermission([
        RoleBasedPermissionGroups.Admin,
        RoleBasedPermissionGroups.AuthBase,
        RoleBasedPermissionGroups.AppAdmin,
        RoleBasedPermissionGroups.User,
        SessionPermissionGroups.DeleteSession,
    ]),
    deleteOneSessionById
);

export default router;
