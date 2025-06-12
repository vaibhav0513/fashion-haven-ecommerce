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
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    bestseller: { type: Boolean },
    customProductId: { type: String, unique: true }, 
  },
  { timestamps: true } // 👈 This adds createdAt and updatedAt fields
);

const ProductModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default ProductModel;
