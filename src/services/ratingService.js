const Rating = require("../models/ratingModel");
const productService = require("./productService");

const createRating = async (reqData, user) => {
  const product = await productService.findProductById(reqData.productId);

  const rating = new Rating({
    product: product.productId,
    user: user._id,
    rating: reqData.rating,
  });

  return await rating.save();
};
const getProductRating = async (productId) => {
  const product = await productService.findProductById(productId);

  const rating = await Rating.find({ product: productId })
    .populate("user")

  return rating
};

module.exports ={
  getProductRating,createRating
}