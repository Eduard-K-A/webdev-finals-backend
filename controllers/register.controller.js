/**
 * @fileoverview Authentication controller handling user registration
 */

import authConfig from '../config/auth.config.js';
import UserService from '../services/user.service.js';
import RoleService from '../services/role.service.js';
import AuthUtils from '../utils/auth.utils.js';
import jwt from 'jsonwebtoken';

/**
 * Handle user registration
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if user exists
        const exists = await UserService.checkUserExists(email);
        if (exists) {
            return res.status(400).json({ 
                message: authConfig.ERRORS.USER_EXISTS 
            });
        }

        // Get default role
        const defaultRole = await RoleService.getDefaultRole();
        if (!defaultRole) {
            return res.status(500).json({ 
                message: authConfig.ERRORS.ROLE_NOT_FOUND 
            });
        }

        // Hash password
        const hashedPassword = await AuthUtils.hashPassword(password);

        // Create user
        const newUser = await UserService.createUser(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword
            },
            [defaultRole._id]
        );


        // Generate JWT for the new user
        const secret = process.env.JWT_SECRET || 'default-jwt-secret-key';
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: defaultRole.name },
            secret,
            { expiresIn: '7d' }
        );

        // Send success response with token
        res.status(201).json({
            message: "User created successfully",
            user: AuthUtils.formatUserResponse(newUser),
            token
        });

    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ 
            message: err.message || authConfig.ERRORS.SERVER_ERROR 
        });
    }
};