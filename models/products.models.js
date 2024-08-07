import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: [15, "Description must be at least 15 characters"],
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      public_id: String,
      secure_url: String,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema, "myProducts");
export default Product;
