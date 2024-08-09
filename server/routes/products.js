import express from "express";

const router = express.Router();

import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/products.js";

router.route("/").get(getAllProducts).post(createProduct);
router
    .route("/:id")
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

export default router;
