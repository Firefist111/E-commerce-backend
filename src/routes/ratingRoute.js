const express = require("express");

const router = express.router();
const ratingController = require('../controllers/ratingController');

router.get('/product/:productId',authenticate,ratingController.getProductRating)
router.post('/create',authenticate,ratingController.createRating)



module.exports = router;
