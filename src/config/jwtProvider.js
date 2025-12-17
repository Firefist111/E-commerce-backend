const jwt = require('jsonwebtoken')

const createToken=(userId)=>{
  const token = jwt.sign({userId},process.env.JWTPASSWORD,{expiresIn:"48h"})
  return token 
}

const userIdFromToken = (token)=>{
  const decodedToken = jwt.verify(token,process.env.JWTPASSWORD)
  const userId = decodedToken.userId
  return userId
}

module.exports = {
  createToken,
  userIdFromToken
}