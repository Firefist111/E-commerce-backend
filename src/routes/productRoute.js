const express = require("express");

const router = express.router();
const productController = require('../controllers/productController');
const { authenticate } = require("../middleware/authMiddleware");

router.get('/',authenticate,productController.findAllProduct)
router.get('/id/:id',authenticate,productController.findProductById)



module.exports = router;