import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

import adminRoutes from "./routes/adminRoutes/adminRoutes.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Load environment variables
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// ES module-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads/ exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Connect to DBs
connectDB();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static uploads
app.use("/uploads", express.static(uploadsDir));
// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.use("/api/admin", adminRoutes);
// Root endpoint
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
