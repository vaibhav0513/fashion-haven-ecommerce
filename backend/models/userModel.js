import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  {
    minimize: false,
    timestamps: true, // ✅ This adds createdAt and updatedAt
  }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
