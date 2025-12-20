const express = require("express");

const router = express.router();

const reviewController = require('../controllers/reviewController');
const { authenticate } = require("../middleware/authMiddleware");

router.get('/',authenticate,reviewController.getAllReview)
router.post('/product/:productId',authenticate,reviewController.createReview)


module.exports = router;
