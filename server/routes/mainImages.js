import express from "express";

const router = express.Router();

import { uploadMainImage } from "../controllers/mainImages.js";

router.route("/").post(uploadMainImage);

export default router;