import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../controllers/products.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.get("/:pid", getProductById);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProduct);

export default router;
