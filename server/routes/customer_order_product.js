import express from 'express';

const router = express.Router();

import {
    getAllProductOrders,
    createOrderProduct,
    getProductOrder,
    updateProductOrder,
    deleteProductOrder
} from '../controllers/customer_order_product.js';

router.route('/')
    .get(getAllProductOrders)
    .post(createOrderProduct);
router.route('/:id')
    .get(getProductOrder)
    .put(updateProductOrder)
    .delete(deleteProductOrder);


export default router;