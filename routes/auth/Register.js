import express from 'express';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();
// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
// POST /auth/register
router.post("/register", async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  if (!username || !firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

export default router;