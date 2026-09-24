import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    brand: {
      type: String,
      default: "Generic",
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    specifications: [
      {
        key: {
          type: String,
          trim: true,
        },
        value: {
          type: String,
          trim: true,
        },
      },
    ],

    variants: [
      {
        color: {
          type: String,
          default: "Standard",
          trim: true,
        },

        price: {
          type: Number,
          required: [true, "Variant price is required"],
          min: 0,
        },

        stock: {
          type: Number,
          required: [true, "Variant stock is required"],
          default: 0,
          min: 0,
        },

        isDefault: {
          type: Boolean,
          default: false,
        },

        images: [
          {
            url: {
              type: String,
              required: [true, "Image URL is required"],
            },

            public_id: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
