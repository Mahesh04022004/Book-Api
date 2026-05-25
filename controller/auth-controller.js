const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const registerUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (registerUser) {
      if (registerUser.username === username) {
        return res.status(400).json({
          success: false,
          message: "username is already register",
        });
      }
      return res.status(400).json({
        success: false,
        message: "email already register",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      role: role || "user",
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "user register successfully",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong in registering the user",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "username not register try login with other username",
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "wrong username or password",
      });
    }
    const token = jwt.sign(
      {
        user_id: existingUser.__id,
        user_name: existingUser.username,
        user_role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong in registering the user",
    });
  }
};

module.exports = { register, login };
