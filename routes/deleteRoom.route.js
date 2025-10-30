/**
 * @fileoverview Delete route configuration
 * Defines endpoints for handling image deletion
 */

import express from 'express';
import { deleteImage } from '../controllers/uploadRoom.controller';

const router = express.Router();

/**
 * @route   DELETE /:publicId
 * @desc    Delete an image from Cloudinary
 * @access  Private
 * @param   publicId - Cloudinary public ID of the image
 * @note    This route is intended to be mounted under '/api/delete'
 */

router.delete('/upload/:publicId',deleteImage);

export default router;