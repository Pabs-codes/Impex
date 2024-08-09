import express from "express";

const router = express.Router();

import {getProductBySlug} from "../controllers/slugs.js";

router.route("/:slug").get(getProductBySlug);

export default router;