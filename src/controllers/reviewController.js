const reviewService = require('../services/reviewService')

const createReview = async(req,res)=>{
  try {
    const user = req.user
    const review = await reviewService.createReview(req.body,user)

    return res.status(201).json({
      review,
      messsage : "Review Created Successfully"
    })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getAllReview = async(req,res)=>{
  try {
    const user = req.user
    const reviews = await reviewService.getAllReview(req.params.productId)

    return res.status(201).json({
      reviews
    })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports ={
  getAllReview,createReview
}