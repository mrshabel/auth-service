import { Router, Request, Response } from "express";

const router = Router();

router.route("/").get(async (req: Request, res: Response) => {
    res.status(200).json({ message: "Great! Auth service is online" });
});

export default router;
