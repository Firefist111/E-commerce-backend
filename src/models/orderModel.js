const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },

    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems",
        required: true
      }
    ],

    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      required: true
    },

    paymentDetails: {
      paymentMethod: String,
      transactionId: String,
      paymentId: String,
      paymentStatus: {
        type: String,
        default: "Pending"
      }
    },
    discount :{
      type: Number,
    },

    totalPrice: {
      type: Number,
    },

    totalDiscountedPrice: {
      type: Number,
    },

    totalItem: {
      type: Number,
    },

    orderStatus: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
