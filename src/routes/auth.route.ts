import { Router } from "express";
import validate from "../middlewares/validateResource";
import { loginUserSchema, signupUserSchema } from "../schemas/user.schema";
import { loginUser, signupUser } from "../controllers/auth.controller";

const router = Router();

router.route("/signup").post(validate(signupUserSchema), signupUser);
router.route("/login").post(validate(loginUserSchema), loginUser);

export default router;
