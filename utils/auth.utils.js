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
        // Handle populated roles or just role names
        let roleName = 'user';
        if (user.roles) {
            if (Array.isArray(user.roles)) {
                if (user.roles.length > 0) {
                    roleName = user.roles[0].name || user.roles[0];
                }
            } else if (typeof user.roles === 'string') {
                roleName = user.roles;
            }
        }

        return {
            _id: user._id,
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role: roleName,
            roles: Array.isArray(user.roles) 
                ? user.roles.map(r => typeof r === 'string' ? r : r.name)
                : [roleName]
        };
    }
}

export default AuthUtils;