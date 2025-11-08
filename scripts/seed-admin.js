//script for seeding an admin user into the database
import mongoose from 'mongoose';
import UserService from '../services/user.service.js';
import RoleService from '../services/role.service.js';
import authConfig from '../config/auth.config.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Function to hash a password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}; 

// Function to create an admin user
const createAdminUser = async () => {
    const adminEmail = authConfig.ADMIN_EMAIL;
    const adminPassword = authConfig.ADMIN_PASSWORD;}