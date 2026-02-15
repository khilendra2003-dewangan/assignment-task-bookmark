import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "each filed is required",
      });
    }
    const Existinguser = await User.findOne({ email });
    if (Existinguser) {
      return res.status(401).json({
        success: false,
        message: "user is already exist",
      });
    }

    const haspassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: haspassword });

    return res.status(201).json({
      success: true,
      message: "user created sucessfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const googleCallbackController = (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRETKET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production (HTTPS)
    });

    return res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5173"}/bookmarklist`);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

export const Logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const GetUser = async (req, res) => {
  try {
    // user is already attached by auth middleware
    const user = req.user;

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

