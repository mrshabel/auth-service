import { Router } from "express";
import validate from "../middlewares/validateResource";
import {
    forgotPasswordSchema,
    loginSchema,
    logoutSchema,
    resetPasswordSchema,
    signupSchema,
} from "../schemas/auth.schema";
import {
    forgotPassword,
    login,
    logout,
    resetPassword,
    signup,
} from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(validate(signupSchema), signup);

router.route("/login").post(validate(loginSchema), login);

router
    .route("/forgot-password")
    .post(validate(forgotPasswordSchema), forgotPassword);

router
    .route("/reset-password/:token")
    .post(validate(resetPasswordSchema), resetPassword);

router.route("/logout").post(validate(logoutSchema), requireAuth, logout);

export default router;
