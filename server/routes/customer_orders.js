import express from 'express';

const router = express.Router();

import {
    getAllOrders,
    createCustomerOrder,
    getCustomerOrder,
    updateCustomerOrder,
    deleteCustomerOrder
} from '../controllers/customer_orders.js';

router.route('/')
    .get(getAllOrders)
    .post(createCustomerOrder);
router.route('/:id')
    .get(getCustomerOrder)
    .put(updateCustomerOrder)
    .delete(deleteCustomerOrder);


export default router;