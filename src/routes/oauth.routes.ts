import { Router } from "express";
import validate from "../middlewares/validateResource";
import { googleOAuth } from "../controllers/oauth.controller";
import { googleOAuthSchema } from "../schemas/oauth.schema";

const router = Router();

router.route("/google").get(validate(googleOAuthSchema), googleOAuth);

export default router;
