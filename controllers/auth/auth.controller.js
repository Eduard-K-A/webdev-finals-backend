import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;

    try {
        // Validate required fields
        if (!username || !firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create new user
        const newUser = new User({
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        // Save user to database
        await newUser.save();

        // Send success response
        res.status(201).json({ 
            message: "User created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: err.message || "Server error" });
    }
};