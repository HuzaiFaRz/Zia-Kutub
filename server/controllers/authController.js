import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// SignUp User
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are must be required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// LogIn User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are must be required" });
    }

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Genrate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send response
    res.status(201).json({
      message: "User login successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
