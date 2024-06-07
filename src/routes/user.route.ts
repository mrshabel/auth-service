import { Router, Request, Response } from "express";
import validate from "../middlewares/validateResource";
import { createUserSchema } from "../schemas/user.schema";
import { addOneUser } from "../controllers/user.controller";

const router = Router();

router.route("/users").post(validate(createUserSchema), addOneUser);

export default router;
