import User from '../models/User.js';

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
