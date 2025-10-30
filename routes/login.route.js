import express from 'express';
import { login } from '../controllers/login.controller.js';
import { validateLogin } from '../middleware/login.validator.js';

const router = express.Router();

/**
 * @route   POST /auth/login
 * @desc    Login an existing user
 * @access  Public
 * @body    {username, password}
 * @returns {message, user: {id, username, email, firstName, lastName, roles}}
 */
router.post("/login", validateLogin, login);

export default router;