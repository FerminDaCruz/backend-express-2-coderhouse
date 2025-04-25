import passport from "passport";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../controllers/products.controller.js";
import { Router } from "express";
import { authorizeAdmin } from "../middlewares/authorizeAdmin.js";

const router = Router();

router.get("/", getProducts);

router.post(
    "/",
    passport.authenticate("current", { session: false }),
    authorizeAdmin(),
    createProduct
);

router.get(
    "/:pid",
    passport.authenticate("current", { session: false }),
    authorizeAdmin(),
    getProductById
);

router.put(
    "/:pid",
    passport.authenticate("current", { session: false }),
    authorizeAdmin(),
    updateProduct
);

router.delete(
    "/:pid",
    passport.authenticate("current", { session: false }),
    authorizeAdmin(),
    deleteProduct
);

export default router;
