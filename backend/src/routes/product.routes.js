import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../controllers/productsController.js";
import router from "./cartRoutes.js";

router.get("/", getProducts);

router.post("/", createProduct);

router.get("/:pid", getProductById);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProduct);

export default router;
