import { Router } from "express";
import {
    addProductToCart,
    clearCart,
    createCart,
    deleteProductFromCart,
    getCart,
    updateCart,
    updateProductFromCart,
} from "../controllers/cartController";
const router = Router();

router.post("/", createCart);

router.get("/:cid", getCart);

router.post("/:cid/product/:pid", addProductToCart);

router.delete("/:cid/products/:pid", deleteProductFromCart);

router.put("/:cid", updateCart);

router.put("/:cid/products/:pid", updateProductFromCart);

router.delete("/:cid", clearCart);

export default router;
