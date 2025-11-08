/**
 * @fileoverview Authentication middleware for validating login requests
 */

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    // Validate password length
    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long"
        });
    }

    next();
};