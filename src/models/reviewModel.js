const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      raf: "products",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      raf: "users",
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
