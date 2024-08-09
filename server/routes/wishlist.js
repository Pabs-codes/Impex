import express from "express";

const router = express.Router();

import {
    getAllWishlist,
    createWishItem,
    getAllWishlistByUserId,
    getSingleProductFromWishlist,
    deleteWishItem,
} from "../controllers/wishlist.js";

router.route("/").get(getAllWishlist).post(createWishItem);
router.route("/:userId").get(getAllWishlistByUserId);
router.route("/:userId/:productId").get(getSingleProductFromWishlist).delete(deleteWishItem);

export default router;
