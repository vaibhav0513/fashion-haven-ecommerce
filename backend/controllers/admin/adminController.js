import ProductModel from "../../models/productModel.js";
import UserModel from "../../models/userModel.js";
import OrderModel from "../../models/orderModel.js";
import AdminModel from "../../models/AdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function generateCustomProductId(category, subCategory) {
  const catPrefix = category?.trim().toUpperCase().charAt(0); // M
  const subCatPrefix = subCategory?.trim().slice(0, 3).toUpperCase(); // TOP
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit number
  return `${catPrefix}${subCatPrefix}-${randomNum}`;
}

export const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    const newAdmin = new AdminModel({ name, email, password }); // password will hash automatically
    await newAdmin.save();

    const token = jwt.sign(
      { adminId: newAdmin._id, email: newAdmin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET all products with category-wise count
export const getAllProducts = async (req, res) => {
  try {
    // const products = await ProductModel.find().sort({ date: -1 });
    // Backend (already present):
    const products = await ProductModel.find().sort({ createdAt: -1 });

    // Category-wise count using aggregation
    const categoryCount = await ProductModel.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    // Format category data nicely
    const formattedCategoryCount = categoryCount.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.json({
      success: true,
      total: products.length,
      categories: formattedCategoryCount,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error,
    });
  }
};

// GET product stats only (category-wise + total count)
export const getProductStats = async (req, res) => {
  try {
    const total = await ProductModel.countDocuments();

    const categoryCount = await ProductModel.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const formattedCategoryCount = categoryCount.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.json({
      success: true,
      total,
      categories: formattedCategoryCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product stats",
      error,
    });
  }
};

// CREATE new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      bestseller,
      sizes,
      quantity,
    } = req.body;

    // ✅ Parse and validate sizes
    let parsedSizes = [];
    try {
      parsedSizes = JSON.parse(sizes);
      if (!Array.isArray(parsedSizes))
        throw new Error("Sizes must be an array");
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid format for sizes. Must be a JSON array.",
      });
    }

    // ✅ Generate unique custom product ID
    let customProductId;
    let exists = true;
    while (exists) {
      customProductId = generateCustomProductId(category, subCategory);
      const existing = await ProductModel.findOne({ customProductId });
      if (!existing) exists = false;
    }

    // ✅ Create product
    const product = new ProductModel({
      name,
      description,
      price: parseFloat(price),
      category,
      subCategory,
      bestseller: bestseller === "true",
      sizes: parsedSizes,
      images: [],
      quantity: parseInt(quantity),
      customProductId,
    });

    // ✅ Handle uploaded images
    const files = req.files || {};
    ["image1", "image2", "image3", "image4"].forEach((key) => {
      if (files[key]?.[0]) product.images.push(files[key][0].path);
    });

    // ✅ Save to DB
    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created",
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    return res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
      stack: error.stack,
    });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const updated = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, message: "Product updated", product: updated });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to update product", error });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting product", error });
  }
};

// SEARCH products by customProductId or name
export const searchProducts = async (req, res) => {
  const { query } = req.query;

  try {
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query is required" });
    }

    const regex = new RegExp(query, "i"); // Case-insensitive search

    const products = await ProductModel.find({
      $or: [{ customProductId: regex }, { name: regex }],
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      results: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching products",
      error: error.message,
    });
  }
};

// ========== USER MANAGEMENT ==========

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.json({ success: true, users });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching users", error });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting user", error });
  }
};
