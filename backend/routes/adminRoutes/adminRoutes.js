import express from 'express';
import {
  getAllProducts, createProduct, updateProduct, deleteProduct,
  getAllUsers, deleteUser,
  getAllOrders, updateOrderStatus, adminLogin , adminRegister
} from '../../controllers/admin/adminController.js';

const router = express.Router();

// Product Routes


router.post('/login', adminLogin);

router.post('/register', adminRegister);

router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// User Routes
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

// Order Routes
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatus);

export default router;
