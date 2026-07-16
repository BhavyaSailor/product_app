import { Router } from "express";
import { syncUser } from "../controllers/userController";
import { getAuth, requireAuth } from "@clerk/express";

const router = Router();

router.post("/sync", requireAuth(), syncUser)

export default router;