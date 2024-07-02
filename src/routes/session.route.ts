import { Router } from "express";
import validate from "../middlewares/validateResource";
import {
    getOneSessionByIdSchema,
    deleteOneSessionByIdSchema,
} from "../schemas/session.schema";
import {
    getAllSessions,
    getAllSessionsByUserId,
    getOneSessionById,
    deleteAllSessionsByUserId,
    deleteOneSessionById,
} from "../controllers/session.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

// require authentication
router.use(requireAuth);

router.get("/sessions", getAllSessions);

router.get("/sessions/me", getAllSessionsByUserId);
router.delete("/sessions/me", deleteAllSessionsByUserId);

router.get(
    "/sessions/:id",
    validate(getOneSessionByIdSchema),
    getOneSessionById
);
router.delete(
    "/sessions/:id",
    validate(deleteOneSessionByIdSchema),
    deleteOneSessionById
);

export default router;
