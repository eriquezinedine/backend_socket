import { Router } from "express";

import { createUser } from "../controllers/userControllers";

const router = Router();

router.get("/get", createUser);

export default router;
