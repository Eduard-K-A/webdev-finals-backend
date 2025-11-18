import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

/**
 * Handle user login
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email and populate roles
    const user = await User.findOne({ email }).populate("roles");
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Verify password using bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid Email or password",
      });
    }

    // Create JWT token (must use same secret as auth middleware)
    const jwtSecret = process.env.JWT_SECRET || 'default-jwt-secret-key';
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });

    // Return success with user data (excluding password) and token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.roles && user.roles.length > 0 ? user.roles[0].name : 'user',
        roles: user.roles.map((role) => role.name),
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "An error occurred during login",
    });
  }
};
