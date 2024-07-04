import { Router } from "express";
import validate from "../middlewares/validateResource";
import { addOneUserSchema } from "../schemas/user.schema";
import { addOneUser } from "../controllers/user.controller";

const router = Router();

router.route("/users").post(validate(addOneUserSchema), addOneUser);

export default router;
