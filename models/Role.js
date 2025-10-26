/**
 * @fileoverview Role model for handling user permissions and access control
 * This implements a Role-Based Access Control (RBAC) system where each user
 * can have one or more roles, and each role has specific permissions.
 */

import mongoose from "mongoose";

/**
 * Available permissions in the system
 * @constant {string[]}
 */
const AVAILABLE_PERMISSIONS = [
  'create_booking',   // Can create new bookings
  'view_bookings',    // Can view booking details
  'manage_rooms',     // Can create/edit/delete rooms
  'manage_users',     // Can manage user accounts
  'manage_amenities', // Can manage room amenities
  'write_review'      // Can write room reviews
];

/**
 * Available role types
 * @constant {string[]}
 */
const ROLE_TYPES = ['user', 'admin', 'public'];

/**
 * MongoDB Schema for Role
 * @typedef {Object} RoleSchema
 * @property {string} name - The role name (user/admin/public)
 * @property {string[]} permissions - List of permissions granted to this role
 * @property {string} description - description of the role
 * @property {Date} createdAt - Timestamp of role creation
 * @property {Date} updatedAt - Timestamp of last update
 */
const roleSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true,
      enum: ROLE_TYPES, // Restrict to predefined roles
      default: 'user'
    },
    permissions: [{
      type: String,
      enum: AVAILABLE_PERMISSIONS, // Validate against available permissions
      required: true
    }],
    description: { 
      type: String,
      required: true
    }
  },
  { 
    timestamps: true // Automatically manage createdAt and updatedAt
  }
);


/**
 * Mongoose model for Role
 * @type {mongoose.Model}
 */
const Role = mongoose.model("Role", roleSchema);

/**
 * Initialize default roles in the system
 * This function should be called when the application starts
 * It will create or update the default roles with their permissions
 * @returns {Promise<void>}
 */
export async function initializeRoles() {
  // Define the default roles and their permissions
  const roles = [
    {
      name: 'public',
      permissions: [
        'view_bookings'  // Public users can only view
      ],
      description: 'Unauthenticated public access'
    },
    {
      name: 'user',
      permissions: [
        'create_booking', // Regular users can book
        'view_bookings',  // View their bookings
        'write_review'    // Write reviews
      ],
      description: 'Authenticated regular user'
    },
    {
      name: 'admin',
      permissions: [
        'create_booking',    // Admins have all permissions
        'view_bookings',
        'manage_rooms',
        'manage_users',
        'manage_amenities',
        'write_review'
      ],
      description: 'System administrator with full access'
    }
  ];

  try {
    // Upsert each role (create if doesn't exist, update if exists)
    for (const role of roles) {
      await Role.findOneAndUpdate(
        { name: role.name },
        role,
        { 
          upsert: true, // Create if doesn't exist
          new: true     // Return the updated document
        }
      );
    }
    console.log('Role system initialized successfully');
  } catch (error) {
    console.error('Error initializing roles:', error);
    throw error; // Rethrow to handle in the application
  }
}

/**
 * Helper method to check if a permission is valid
 * @param {string} permission - Permission to validate
 * @returns {boolean} True if permission is valid
 */
roleSchema.statics.isValidPermission = function(permission) {
  return AVAILABLE_PERMISSIONS.includes(permission);
};

/**
 * Helper method to get all available permissions
 * @returns {string[]} Array of all possible permissions
 */
roleSchema.statics.getAvailablePermissions = function() {
  return [...AVAILABLE_PERMISSIONS];
};

export default Role;