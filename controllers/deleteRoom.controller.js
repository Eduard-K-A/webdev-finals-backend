/**
 * @fileoverview Controller for handling image deletions
 * Deletes images from Cloudinary
 */

// Import the configured Cloudinary SDK
// Import the configured Cloudinary instance from our config
import cloudinary from '../config/cloudinary.config.js';

/**
 * Delete image from Cloudinary
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const deleteImage = async (req, res) => {
    try {
        const { publicId } = req.params;

        if (!publicId) {
            return res.status(400).json({
                success: false,
                message: 'Public ID is required'
            });
        }

        // Delete from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId, {
             resource_type: 'image' // Specify resource type for clarity
        });

        if (result.result === 'ok') {
            res.status(200).json({
                success: true,
                message: 'Image deleted successfully'
            });
        } else if (result.result === 'not found') {
            // Handle case where the image doesn't exist
            res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        } else {
            // Handle other Cloudinary errors
            throw new Error(result.result || 'Failed to delete image from Cloudinary');
        }

    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting image',
            error: error.message
        });
    }
};