import { Router } from "express";
import validate from "../middlewares/validateResource";
import { loginSchema, signupSchema } from "../schemas/auth.schema";
import { login, signup } from "../controllers/auth.controller";

const router = Router();

router.route("/signup").post(validate(signupSchema), signup);
router.route("/login").post(validate(loginSchema), login);

export default router;
