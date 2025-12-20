const Review = require("../models/reviewModel");
const productService = require("./productService");

const createReview = async (reqData, user) => {
  const product = await productService.findProductById(reqData.productId);

  const review = new Review({
    product: reqData.productId,
    user: user._id,
    review: reqData.review,
  });

  return await review.save();
};

const getAllReview = async (productId) => {
  const product = await productService.findProductById(productId);

  const reviews = await Review.find({ product: productId })
    .populate("user")

 return reviews
};

module.exports ={
  getAllReview,createReview
}