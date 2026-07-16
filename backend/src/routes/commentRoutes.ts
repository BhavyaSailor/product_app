import { Router } from "express";
import * as productController from "../controllers/commentController";
// import { requireAuth } from "@clerk/express";
const router = Router();

router.post("/:productId",  productController.createComment);
router.delete("/:commentId", productController.deleteComment);

export default router;  