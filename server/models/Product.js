import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, lowercase: true, unique: true },
    specifications: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: { type: String, default: "Generic" },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    isAvailable: { type: Boolean, default: true },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
