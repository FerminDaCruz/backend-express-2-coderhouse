import { Router } from "express";
import {
    addProductToCart,
    clearCart,
    createCart,
    deleteProductFromCart,
    getCartById,
    updateCart,
    updateProductFromCart,
    purchaseCart,
} from "../controllers/cart.controller.js";
import { authorizeCartOwner } from "../middlewares/authorizeCartOwner.js";
import passport from "passport";

const router = Router();

router.post(
    "/",
    passport.authenticate("current", { session: false }),
    createCart
);

router.get(
    "/:cid",
    passport.authenticate("current", { session: false }),
    authorizeCartOwner(),
    getCartById
);

router.post(
    "/:cid/products/:pid",
    passport.authenticate("current", { session: false }),
    authorizeCartOwner(),
    addProductToCart
);

router.delete(
    "/:cid/products/:pid",
    passport.authenticate("current", { session: false }),
    authorizeCartOwner(),
    deleteProductFromCart
);

router.put(
    "/:cid",
    passport.authenticate("current", { session: false }),
    authorizeCartOwner(),
    updateCart
);

router.put(
    "/:cid/products/:pid",
    passport.authenticate("current", { session: false }),
    authorizeCartOwner(),
    updateProductFromCart
);

router.delete(
    "/:cid",
    passport.authenticate("current", { session: false }),
    authorizeCartOwner(),
    clearCart
);

router.post(
    "/:cid/purchase",
    passport.authenticate("current", { session: false }),
    authorizeCartOwner(),
    purchaseCart
);

export default router;
