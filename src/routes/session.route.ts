import { Router } from "express";
import validate from "../middlewares/validateResource";
import {
    getOneSessionByIdSchema,
    deleteOneSessionByIdSchema,
    getAllSessionsSchema,
    getAllSessionsByUserIdSchema,
    deleteAllSessionsByUserIdSchema,
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

router.get("/sessions", validate(getAllSessionsSchema), getAllSessions);

router.get(
    "/sessions/me",
    validate(getAllSessionsByUserIdSchema),
    getAllSessionsByUserId
);
router.delete(
    "/sessions/me",
    validate(deleteAllSessionsByUserIdSchema),
    deleteAllSessionsByUserId
);

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
