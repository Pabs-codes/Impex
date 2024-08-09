import express from 'express';

const router = express.Router();

import {
    getAllUsers,
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/users.js';

router.route('/')
    .get(getAllUsers)
    .post(createUser);
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);
router.route('/email/:email')
    .get(getUserByEmail);

export default router;