import { Router } from "express";
import { syncUser } from "../controllers/userController";
import { getAuth  } from "@clerk/express";

const router = Router();

router.post("/sync",  syncUser)

export default router;