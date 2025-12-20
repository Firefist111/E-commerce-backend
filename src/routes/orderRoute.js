const express = require("express");

const router = express.router();
const orderController = require('../controllers/orderController');
const { authenticate } = require("../middleware/authMiddleware");

router.get('/user',authenticate,orderController.orderHistory)
router.get('/:id',authenticate,orderController.findOrderById)
router.post('/',authenticate,orderController.createOrder)



module.exports = router;
