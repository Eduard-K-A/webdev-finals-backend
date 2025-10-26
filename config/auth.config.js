/**
 * Authentication configuration
 * Contains constants and settings for authentication-related functionality
 */
export default {
    // Password settings
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_SALT_ROUNDS: 10,

    // Registration settings
    ALLOWED_ROLES: ['user', 'admin', 'public'],
    DEFAULT_ROLE: 'user',

    // Error messages
    ERRORS: {
        MISSING_FIELDS: "Missing required fields",
        USER_EXISTS: "User with this email already exists",
        ROLE_NOT_FOUND: "Default role not found. Contact administrator.",
        SERVER_ERROR: "Server error occurred"
    }
};