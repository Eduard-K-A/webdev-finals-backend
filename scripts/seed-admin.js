
/**
 * @fileoverview Script to seed an admin user into the database
 * Usage: Run this script to create a default admin user if it doesn't exist
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js'; 

// --- Configuration ---
// Load environment variables
dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL 
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD 
// ---------------------

const seedAdmin = async () => {
  let isConnected = false;
  try {
    // Connect to the database
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in your environment variables');
    }
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    isConnected = true;
    console.log('MongoDB Connected...');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: ADMIN_EMAIL });

    if (adminExists) {
      console.log('Admin user already exists.');
      return; // Exit if admin is already there
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    //Create the new admin user
    const adminUser = new User({
      email: ADMIN_EMAIL,
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin', 
    });

    await adminUser.save();
    console.log(' Admin user created successfully!');

  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  } finally {
    // Disconnect from the database
    if (isConnected) {
      await mongoose.disconnect();
      console.log('MongoDB Disconnected.');
    }
    process.exit(isConnected ? 0 : 1); // Exit with success(0) or error(1)
  }
};

// Run the seeder function
seedAdmin();