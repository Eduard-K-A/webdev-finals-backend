/**
 * @fileoverview Role service handling role-related database operations
 */

import Role from '../models/Role.js';
import authConfig from '../config/auth.config.js';

/**
 * Role service class containing role-related operations
 */
class RoleService {
    /**
     * Get role by name
     * @param {string} roleName - Name of the role to fetch
     * @returns {Promise<Role>} Role document
     */
    static async getRoleByName(roleName) {
        return Role.findOne({ name: roleName });
    }

    /**
     * Get default user role
     * @returns {Promise<Role>} Default user role
     */
    static async getDefaultRole() {
        return this.getRoleByName(authConfig.DEFAULT_ROLE);
    }

    /**
     * Get multiple roles by IDs
     * @param {string[]} roleIds - Array of role IDs
     * @returns {Promise<Role[]>} Array of role documents
     */
    static async getRolesByIds(roleIds) {
        return Role.find({ _id: { $in: roleIds } });
    }
}

export default RoleService;