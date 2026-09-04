import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Customer ki details
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Order items
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String },
      },
    ],

    // Delivery Address
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      phone: { type: String, required: true },
    },

    // Payment Info (Only COD)
    paymentMethod: {
      type: String,
      default: "COD",
    },
    isPaid: {
      type: Boolean,
      default: false, // Delivery ke baad Admin ise true mark kar sakta hai
    },

    // Bill Calculation
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalAmount: { type: Number, required: true },

    // Order Status Tracking
    orderStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true, // Isse order Date & Time automatically save ho jata hai
  },
);

module.exports = mongoose.model("Order", orderSchema);
