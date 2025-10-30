
import express from 'express';
import { register } from '../controllers/register.controller.js';
import { validateRegister } from '../middleware/register.validator.js';

const router = express.Router();

/**
 * @route   POST /auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    {username, firstName, lastName, email, password}
 * @returns {message, user: {id, username, email, firstName, lastName, roles}}
 */
router.post("/register", validateRegister, register);

export default router;