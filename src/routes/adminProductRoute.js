const express = require("express");

const router = express.router();
const adminProductController = require('../controllers/productController');
const { authenticate } = require("../middleware/authMiddleware");

router.post('/',authenticate,adminProductController.createProduct)
router.post('/creates',authenticate,adminProductController.createMultipleProduct)
router.delete('/:id',authenticate,adminProductController.deleteProduct)
router.put('/:id',authenticate,adminProductController.updateProduct)

module.exports = router;
