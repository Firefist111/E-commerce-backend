const express = require("express");

const router = express.router();

const adminOrderController = require("../controllers/adminOrderController");
const { authenticate } = require("../middleware/authMiddleware");

router.get('/',authenticate,adminOrderController.getAllOrders)

router.put('/:orderId/confirmed',authenticate,adminOrderController.confirmOrder)
router.put('/:orderId/ship',authenticate,adminOrderController.shippedOrder)
router.put('/:orderId/delete',authenticate,adminOrderController.deleteOrder)
router.put('/:orderId/deliver',authenticate,adminOrderController.deliverOrder)
router.put('/:orderId/cancel',authenticate,adminOrderController.cancelOrder)



module.exports = router;
