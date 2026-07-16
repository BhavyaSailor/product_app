import { Router } from "express";
import * as productController from "../controllers/productController";
// import { requireAuth } from "@clerk/express";

const router = Router();
router.get("/", productController.getAllProducts);
router.get("/my", productController.getMyProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
