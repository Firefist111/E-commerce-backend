const orderService = require("../services/orderService");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const confirmOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.confirmOrder(orderId);

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const shippedOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.shipOrder(orderId);

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deliverOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.deliverOrder(orderId);

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const cancelOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.cancelOrder(orderId);

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.deleteOrder(orderId);

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  deleteOrder,
  cancelOrder,
  deliverOrder,
  shippedOrder,
  confirmOrder,
  confirmOrder,
  getAllOrders,
};
