const { userIdFromToken } = require("../config/jwtProvider");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(404).json({
        message: "token not found",
      });
    }

    const userId = userIdFromToken(token);

    const user = await User.findById(userId);
    if(!user){
      res.status(404).json({
        message: "user not found",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports ={
  authenticate
}
