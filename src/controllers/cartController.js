const cartService = require('../services/cartServices')

const findUserCart = async(req,res)=>{
  const user = req.user
  try {
    const userCart = await cartService.findUserCart(user._id)

    return res.status(200).json({
      userCart,
      message : "Cart created successfully"
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

const addItemToCart = async(req,res)=>{
  const user = req.user
  try {
    const cartItem = await cartService.addCartItem(user._id,req.body)

    return res.status(200).json({
      message : "item added to cart successfully"
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports ={
  addItemToCart,findUserCart
}