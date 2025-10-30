/**
 * @fileoverview Upload room routes configuration
 * Defines endpoints for handling image uploads
 */

import express from 'express';
import { handleUpload } from '../controllers/uploadRoom.controller.js';
import upload from '../middleware/upload.validator.js';

const router = express.Router();

/**
 * @route   POST /api/upload
 * @desc    Upload multiple images with description
 * @access  Private
 * @body    multipart/form-data with 'images' files and 'description' field
 */
router.post('/upload', 
    upload.array('images', 10), // Handle up to 10 images
    handleUpload
);

export default router;
