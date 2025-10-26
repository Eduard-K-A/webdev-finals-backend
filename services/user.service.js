/**
 * @fileoverview User service handling user-related database operations
 */

import User from '../models/User.js';

/**
 * User service class containing user-related operations
 */
class UserService {
    /**
     * Check if a user with the given email exists
     * @param {string} email - Email to check
     * @returns {Promise<boolean>} True if user exists
     */
    static async checkUserExists(email) {
        const user = await User.findOne({ email });
        return !!user;
    }

    /**
     * Create a new user
     * @param {Object} userData - User data
     * @param {string[]} roleIds - Array of role IDs to assign
     * @returns {Promise<User>} Created user
     */
    static async createUser(userData, roleIds) {
        const user = new User({
            ...userData,
            roles: roleIds
        });
        return user.save();
    }

    /**
     * Get user by ID with populated roles
     * @param {string} userId - User's MongoDB ID
     * @returns {Promise<User>} User with populated roles
     */
    static async getUserWithRoles(userId) {
        return User.findById(userId).populate('roles');
    }
}

export default UserService;