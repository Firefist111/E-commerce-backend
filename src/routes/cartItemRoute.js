const express = require("express");

const router = express.router();

const cartItemController = require('../controllers/cartItemController')
const { authenticate } = require("../middleware/authMiddleware");

router.put('/:id',authenticate,cartItemController.updateCartItem)
router.delete('/:id',authenticate,cartItemController.removeCartItem)


module.exports = router;
