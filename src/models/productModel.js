const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required:true,
  },
  discountedPercent: {
    type: Number,
    required:true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  brand: {
    type: String,
    required :true
  },
  color: {
    type: String,
    required :true
  },
  size: [
    {
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
    },
  ],

  imageUrl: {
    type: String,
    required: true,
  },
  rating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  numRatings: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  createdAt:{
    type : Date,
    default: Date.now()
  }
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
