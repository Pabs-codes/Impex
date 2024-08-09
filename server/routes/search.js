import express from "express";

const router = express.Router();

import {searchProducts} from "../controllers/search.js";

router.route("/").get(searchProducts);

export default router;
