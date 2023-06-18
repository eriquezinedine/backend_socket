import { Router, Request, Response } from "express";

import { createUser } from "../controllers/userControllers";

const router = Router();

router.get("/get", createUser);
router.get("/", (req: Request, res: Response) => {
  res.send("Bienvenido amigo");
});

export default router;
