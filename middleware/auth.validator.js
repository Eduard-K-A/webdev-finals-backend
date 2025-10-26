/**
 * @fileoverview Validation middleware for authentication routes
 */

import authConfig from '../config/auth.config.js';
import AuthUtils from '../utils/auth.utils.js';

/**
 * Validate registration request body
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next function
 */
export const validateRegister = (req, res, next) => {
    const { username, firstName, lastName, email, password } = req.body;

    // Check required fields
    if (!username || !firstName || !lastName || !email || !password) {
        return res.status(400).json({ 
            message: authConfig.ERRORS.MISSING_FIELDS 
        });
    }

    // Validate password
    if (!AuthUtils.validatePassword(password)) {
        return res.status(400).json({ 
            message: `Password must be at least ${authConfig.PASSWORD_MIN_LENGTH} characters long` 
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            message: "Invalid email format" 
        });
    }

    next();
};