/**
 * @fileoverview Authentication routes configuration
 */

import express from 'express';
import { register } from '../controllers/auth/index.js';
import { validateRegister } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    {username, firstName, lastName, email, password}
 * @returns {message, user: {id, username, email}}
 */
router.post("/register", validateRegister, register);

export default router;