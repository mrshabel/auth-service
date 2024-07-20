import { Router } from "express";
import validate from "../middlewares/validateResource";
import {
    gitHubOAuth,
    gitHubOAuthCallback,
    googleOAuth,
    googleOAuthCallback,
} from "../controllers/oauth.controller";
import {
    gitHubOAuthCallbackSchema,
    googleOAuthCallbackSchema,
} from "../schemas/oauth.schema";

const router = Router();

router.route("/google").get(googleOAuth);
router
    .route("/google/callback")
    .get(validate(googleOAuthCallbackSchema), googleOAuthCallback);

router.route("/github").get(gitHubOAuth);
router
    .route("/github/callback")
    .get(validate(gitHubOAuthCallbackSchema), gitHubOAuthCallback);

export default router;
