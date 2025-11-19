import User from '../models/User.js';
import Role from '../models/Role.js';
import bcrypt from "bcryptjs";

/**
 * Get all users (excluding password) and populate their roles
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('roles');

    // Format roles as array of names if populated
    const formatted = users.map(u => ({
      _id: u._id,
      id: u._id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      phone: u.phone,
      roles: Array.isArray(u.roles) ? u.roles.map(r => (r.name ? r.name : r)) : [],
      createdAt: u.createdAt,
      updatedAt: u.updatedAt
    }));

    return res.status(200).json({ users: formatted });
  } catch (err) {
    console.error('getAllUsers error:', err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

/**
 * Get a single user by id
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password').populate('roles');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const formatted = {
      _id: user._id,
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      roles: Array.isArray(user.roles) ? user.roles.map(r => (r.name ? r.name : r)) : [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return res.status(200).json({ user: formatted });
  } catch (err) {
    console.error('getUserById error:', err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Find the correct role document
    const roleName = role === 'admin' ? 'admin' : 'user';
    const roleDoc = await Role.findOne({ name: roleName });
    if (!roleDoc) {
      return res.status(500).json({ message: `Role '${roleName}' not found in database.` });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roles: [roleDoc._id],
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteUser = async (req, res) => {  
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ message: 'User deleted', user });
  } catch (err) {
    console.error('deleteUser error:', err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};
