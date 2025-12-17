const { userIdFromToken } = require("../config/jwtProvider")
const User = require("../models/userModel")
const { userProfileByToken } = require("../services/userServices")

const getUserProfile=async(req,res)=>{
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
      return res.status(404).json({
        message : "Token not found"
      })
    }
    const user = await userProfileByToken(token)
    return res.status(200).json({
      user
    })
  } catch (error) {
    return res.status(500).json({
      error : error.message
    })
  }
}

const getAllUsers = async(req,res)=>{
  try {
    const users = await User.find()

    return res.status(200).send(users)
    
  } catch (error) {
    return res.status(500).json({
      error : error.message
    })
  }
}

module.exports ={
  getAllUsers,
  getUserProfile
}