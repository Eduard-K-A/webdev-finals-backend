/**
 * @fileoverview Authentication utilities for password hashing and validation
 */

import bcrypt from 'bcryptjs';
import authConfig from '../config/auth.config.js';

/**
 * Authentication utility functions
 */
class AuthUtils {
    /**
     * Hash a plain text password
     * @param {string} password - Plain text password
     * @returns {Promise<string>} Hashed password
     */
    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(authConfig.PASSWORD_SALT_ROUNDS);
        return bcrypt.hash(password, salt);
    }

    /**
     * Validate password meets requirements
     * @param {string} password - Password to validate
     * @returns {boolean} True if password is valid
     */
    static validatePassword(password) {
        return password && password.length >= authConfig.PASSWORD_MIN_LENGTH;
    }

    /**
     * Format user data for response
     * @param {User} user - User document
     * @returns {Object} Formatted user data
     */
    static formatUserResponse(user) {
        return {
            id: user._id,
            username: user.username,
            email: user.email
        };
    }
}

export default AuthUtils;