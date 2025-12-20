const { userIdFromToken } = require("../config/jwtProvider");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async (userData ) => {
  try {
    const { firstName, lastName, email, password } = userData;
    if (!firstName || !lastName || !email || !password) {
      throw new Error("All Fields are required");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findByUserId = async (userId) => {
  try {
    const user = await User.findById(userId).populate("address");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findByUserEmail = async (email) => {
  try {
    const user = await User.findOne({email});
    if (!user) {
      throw new Error("User not found with email");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const userProfileByToken = async (token) => {
  try {
    const userId = userIdFromToken(token);
    const user = await User.findById(userId);
    console.log(typeof(user))

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async()=>{
  try {
    const users = await User.find({})
    return users
  } catch (error) {
    throw new Error(error.message);
    
  }
}

module.exports = {
  createUser,
  findByUserEmail,
  findByUserId,
  userProfileByToken,
  getAllUsers
};
