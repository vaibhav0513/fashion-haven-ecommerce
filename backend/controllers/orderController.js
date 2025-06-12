// import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import productModel from "../models/productModel.js";

// Global variables
const currency = "usd";
const deliveryCharge = 10;

// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    console.log("Received items:", items);

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Reduce product quantity
    for (const item of items) {
  const productId = item._id; // correct field
  console.log("Finding product with ID:", productId);

  const product = await productModel.findById(productId);

  if (!product) {
    console.log("Product not found:", productId);
    continue;
  }

  if (product.quantity < item.quantity) {
    return res.status(400).json({
      success: false,
      message: `Insufficient stock for ${product.name}`,
    });
  }

  product.quantity -= item.quantity;
  await product.save();
  console.log(`✅ Updated quantity for ${product.name}: ${product.quantity}`);
}


    // Clear cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error("Order placement failed:", error);
    res.json({ success: false, message: error.message });
  }
};

//  Placing orders using Stripe Mthod

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Stripe
// const verifyStripe = async (req, res) => {
//   const { orderId, success, userId } = req.body;

//   try {
//     if (success === "true") {
//       await orderModel.findByIdAndUpdate(orderId, { payment: true });
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });
//       res.json({ success: true });
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      const order = await orderModel.findById(orderId);
      if (!order)
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });

      order.payment = true;
      await order.save();

      // Reduce stock
      for (const item of items) {
        const product = await productModel.findById(item.productId);
        if (product) {
          if (product.quantity < item.quantity) {
            return res.status(400).json({
              success: false,
              message: `Insufficient stock for ${product.name}`,
            });
          }
          product.quantity -= item.quantity;
          await product.save();
        }
      }

      // Clear cart
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  Placing orders using Razorpay Mthod

const placeOrderRazorpay = async (req, res) => {};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Order data for Frondend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders }); // Changed `success` to `true` for successful response and added the missing parenthesis
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status from Admin
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
