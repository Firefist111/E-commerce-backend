const cartItemService = require("../services/cartItemService");

const updateCartItem = async (req, res) => {
  const user = req.user;
  try {
    const updatedCartItem = await cartItemService.updateCartItem(
      user._id,
      req.params.id,
      req.body
    );
    return res.status(200).send(updateCartItem);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const removeCartItem = async (req, res) => {
  const user = req.user;
  try {
    const removeCartItem = await cartItemService.removeCardItem(
      user._id,
      req.params.id,
    );
    return res.status(200).json({
      message : "Cart item removed successfully"
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  removeCartItem,updateCartItem
}

