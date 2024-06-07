import { Router, Request, Response } from "express";

const router = Router();

router.all("*", async (req: Request, res: Response) => {
    return res.status(404).json({ message: "Origin not found on this server" });
});

export default router;
