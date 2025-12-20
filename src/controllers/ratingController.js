const ratingService = require('../services/ratingService')

const createRating = async(req,res)=>{
  try {
    const user = req.user
    const rating = await ratingService.createRating(req.body,user)

    return res.status(201).json({
      rating,
      messsage : "Rating Created Successfully"
    })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getProductRating = async(req,res)=>{
  try {
    const user = req.user
    const rating = await reviewService.getProductRating(req.params.productId)

    return res.status(201).json({
      rating
    })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports ={
  getProductRating,createRating
}