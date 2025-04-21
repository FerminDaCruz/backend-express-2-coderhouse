import { Router } from "express";
import {
    addProductToCart,
    clearCart,
    createCart,
    deleteProductFromCart,
    getCartById,
    updateCart,
    updateProductFromCart,
} from "../controllers/cart.controller.js";
const router = Router();

router.post("/", createCart);

router.get("/:cid", getCartById);

router.post("/:cid/products/:pid", addProductToCart);

router.delete("/:cid/products/:pid", deleteProductFromCart);

router.put("/:cid", updateCart);

router.put("/:cid/products/:pid", updateProductFromCart);

router.delete("/:cid", clearCart);

export default router;
