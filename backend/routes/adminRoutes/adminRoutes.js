import express from "express";
import {
  getAllProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  deleteUser,
  adminLogin,
  adminRegister,
  getProductStats,
} from "../../controllers/admin/adminController.js";
import { uploadMultiple } from "../../middleware/uploadMiddleware.js";

const router = express.Router();

// Product Routes
router.post("/login", adminLogin);
router.post("/register", adminRegister);

router.get("/products", getAllProducts);
router.get("/search", searchProducts); 
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/products/stats", getProductStats);

router.post("/products", uploadMultiple, createProduct);

// User Routes
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

export default router;
