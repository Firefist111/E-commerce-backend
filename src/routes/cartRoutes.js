const express = require("express");

const router = express.router();

const cartController = require('../controllers/cartController');
const { authenticate } = require("../middleware/authMiddleware");

router.get('/',authenticate,cartController.findUserCart)
router.put('/add',authenticate,cartController.addItemToCart)



module.exports = router;
