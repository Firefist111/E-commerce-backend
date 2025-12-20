const CartItem = require("../models/cartItemModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const createCart = async (user) => {
  try {
    const cart = await Cart.create({
      user,
    });
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserCart = async (userId) => {
  try {
    let cart = await Cart.find({ user: userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    let cartItem = await CartItem.findOne({ cart: cart._id }).populate(
      "product"
    );

    cart.cartItems = cartItem;

    let totalPrice = 0;
    let totalItem = 0;
    let totalDiscountedPrice = 0;

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.totalPrice;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.qunatity;
    }

    cart.totalPrice = totalPrice;
    cart.totalDiscountedPrice = totalPrice;
    cart.totalItem = totalPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addCartItem = async (userId, req) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(req.productId); //productId send By client after selecting
    //checking if the cartItem  is present in user's cart
    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      user: userId,
    });
    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        user: userId,
        size: req.size,
        price: product.price,
        discountedPrice: product.discountedPrice,
        quantity: 1,
      });

      const createdCartItem = await  cartItem.save();
      cart.cartItems.push(createdCartItem);
      await cart.save();

      return "Item added to cart";
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCart,
  addCartItem,
  findUserCart,
};
