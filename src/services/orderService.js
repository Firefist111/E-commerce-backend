const Address = require("../models/addressModel");
const OrderItem = require("../models/orderItemModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const cartService = require("./cartServices");

const createOrder = async (user, shippingAddress) => {
  try {
    let address;
    if (shippingAddress._id) {
      const addExists = await Address.findById(shippingAddress._id);
      if (!addExists) {
        throw new Error("Address does not exists");
      }
      address = addExists;
    } else {
      address = new Address(shippingAddress);
      address.user = user;  //still only userId wtll be saved
      await Address.save();

      user.address.push(address);
      await user.save();
    }

    const cart = await cartService.findUserCart(user._id);

    const orderItems = [];
    for (let item of cart.orderItems) {
      const orderItem = new OrderItem({
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        user: item.user,
        discountedPrice: item.discountedPrice,
        //...item
      });

      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
    }

    const newOrder = new Order({
      user,
      orderItems,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      discount: cart.discount,
      totalItem: cart.totalItem,
      shippshippingAddress: address,
    });

    const saveOrder = await newOrder.save();

    return saveOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

const confirmOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order does not exists");
    }

    order.orderStatus = "Placed";
    order.paymentDetails.paymentStatus = "Completed";

    await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const shipOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order does not exists");
    }

    order.orderStatus = "Shipped";

    await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const deliverOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order does not exists");
    }

    order.orderStatus = "Delivered";

    await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const cancelOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order does not exists");
    }

    order.orderStatus = "Cancelled";
    await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const finfdOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } }) //nested populate call
    .populate("shippingAddress");

  return order;
};

const userOrderHistory = async (userId) => {
  const orders = await Order.find({ user: userId, orderStatus: "Placed" })
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();

  return orders;
};

const getAllOrders = async () => {
  const orders = await Order.find({})
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();

  return orders;
};

const deleteOrder = async (orderId) => {
  const orders = await Order.findById(orderId);
  if (!orders) {
    throw new Error("Order does not exists");
  }

  await Order.findByIdAndDelete(orderId);
};

module.exports = {
  deleteOrder,
  getAllOrders,
  userOrderHistory,
  finfdOrderById,
  cancelOrder,
  deliverOrder,
  shipOrder,
  confirmOrder,
  createOrder,
};
