import { Router } from "express";
import validate from "../middlewares/validateResource";
import { addOneUserSchema, getAllUsersSchema } from "../schemas/user.schema";
import { addOneUser, getAllUsers } from "../controllers/user.controller";
import { hasPermission, requireAuth } from "../middlewares/auth.middleware";
import { RoleBasedPermissionGroups } from "../schemas/shared.schema";

const router = Router();

router.route("/users").post(validate(addOneUserSchema), addOneUser);

router
    .route("/users")
    .get(
        validate(getAllUsersSchema),
        requireAuth,
        hasPermission([
            RoleBasedPermissionGroups.AppAdmin,
            RoleBasedPermissionGroups.Admin,
        ]),
        getAllUsers
    );

export default router;
