import express from 'express'

const router = express.Router()

import {
    getSingleProductImages,
    createImage,
    updateImage,
    deleteImage
} from '../controllers/productImages.js'

router.route('/:id').get(getSingleProductImages);
router.route('/').post(createImage);
router.route('/:id').put(updateImage);
router.route('/:id').delete(deleteImage);

export default router;
