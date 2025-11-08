import bcrypt from "bcryptjs";
import User from "../models/User.js";

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

    // Return success with user data (excluding password)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
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
