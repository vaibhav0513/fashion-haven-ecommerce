// import ProductModel from '../models/ProductModel.js';
import ProductModel from '../../models/productModel.js';

import UserModel from '../../models/userModel.js';
import OrderModel from '../../models/orderModel.js';
// import bcrypt from 'bcryptjs';

// ========== PRODUCT MANAGEMENT ==========
import AdminModel from '../../models/AdminModel.js'; // your admin schema/model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    const newAdmin = new AdminModel({ name, email, password }); // password will hash automatically
    await newAdmin.save();

    const token = jwt.sign(
      { adminId: newAdmin._id, email: newAdmin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      token,
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return token & admin info (without password)
    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ date: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error });
  }
};

// CREATE new product
export const createProduct = async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.json({ success: true, message: 'Product created', product: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create product', error });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const updated = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Product updated', product: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update product', error });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product', error });
  }
};

// ========== USER MANAGEMENT ==========

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users', error });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user', error });
  }
};

// ========== ORDER MANAGEMENT ==========

// GET all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate('user', 'name email');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching orders', error });
  }
};

// UPDATE order status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    order.status = req.body.status;
    await order.save();
    res.json({ success: true, message: 'Order status updated', order });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update order status', error });
  }
};
