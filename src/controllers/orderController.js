const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
  try {
    const user = req.user;
    let createOrder = await orderService.createOrder(user, req.body);

    return res.status(201).json({});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findOrderById = async (req, res) => {
  try {
    const user = req.user;
    let order = await orderService.finfdOrderById(req.params.id);

    return res.status(201).json({
      order,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const orderHistory = async (req, res) => {
  try {
    const user = req.user;
    let orders = await orderService.userOrderHistory(user._id);

    return res.status(201).json({
      orders,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  orderHistory,
  findOrderById,
  createOrder,
};
