const CartItem = require("../models/cartItemModel");
const User = require("../models/userModel.js");
const userService = require("./userServices.js");

const findCartItemById = async (cartItemId) => {
  try {
    const cartItem = await CartItem.findById(cartItemId).populate("product");
    if (!cartItem) {
      throw new Error("CartItem does not exists");
    }
    return cartItem;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);

    const user = await userService.findByUserId(userId);

    if (item.user.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = cartItemData.quantity * item.product.price;
      item.discountedPrice =
        cartItemData.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("Can't update cart item ");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeCardItem = async (userId, cartItemId) => {
  try {
    const cartItem = await findCartItemById(cartItemId);

    if (cartItem.user.toString() === userId) {
      await CartItem.findByIdAndDelete(cartItemId);
    } else {
      throw new Error("Can't delete cart item ");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  removeCardItem,
  updateCartItem,
  findCartItemById,
};
