const { createToken } = require("../config/jwtProvider");
const { createUser, findByUserEmail } = require("../services/userServices");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const user = await createUser(req.body);

    const jwt = createToken(user._id);

    // await CartSevice.createCart(user)

    return res.status(201).json({
      message: "User Created",
      jwt,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Enter all fields" });
    }

    const user = await findByUserEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      message: "Login success",
      token,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  login,
  register,
};
