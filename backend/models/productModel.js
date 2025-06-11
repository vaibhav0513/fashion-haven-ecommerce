import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
  },
  { timestamps: true } // 👈 This adds createdAt and updatedAt fields
);

const ProductModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default ProductModel;
