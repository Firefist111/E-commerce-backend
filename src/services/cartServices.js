const Cart = require("../models/cartModel")

const createCart = async(user)=>{
try {
    const cart = await Cart.create({
      user
    })
    return cart
} catch (error) {
  throw new Error(error.message)
}
}