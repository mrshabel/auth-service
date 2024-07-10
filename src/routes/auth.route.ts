import { Router } from "express";
import validate from "../middlewares/validateResource";
import {
    loginSchema,
    logoutSchema,
    signupSchema,
} from "../schemas/auth.schema";
import { login, logout, signup } from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(validate(signupSchema), signup);
router.route("/login").post(validate(loginSchema), login);
router.route("/logout").post(validate(logoutSchema), requireAuth, logout);

export default router;
