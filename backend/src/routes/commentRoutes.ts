import { Router } from "express";
import * as productController from "../controllers/commentController";
import { requireAuth } from "@clerk/express";
const router = Router();

router.post("/:productId", requireAuth(), productController.createComment);
router.delete("/:commentId", requireAuth(), productController.deleteComment);

export default router;  