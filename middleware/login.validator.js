/**
 * @fileoverview Authentication middleware for validating login requests
 */

export const validateLogin = (req, res, next) => {
    const { username, password } = req.body;

    // Check required fields
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    // Basic validation
    if (username.length < 3) {
        return res.status(400).json({
            message: "Username must be at least 3 characters long"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long"
        });
    }

    next();
};