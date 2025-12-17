const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
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
    rating: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("ratings", ratingSchema);

module.exports = Rating;
