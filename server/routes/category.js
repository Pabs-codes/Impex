import express from "express";

const router = express.Router();

import {
    getAllCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    getCategoryByName,
} from "../controllers/category.js";

router.route("/").get(getAllCategories).post(createCategory);
router
    .route("/:id")
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);
router.route("/name/:name").get(getCategoryByName);

export default router;
