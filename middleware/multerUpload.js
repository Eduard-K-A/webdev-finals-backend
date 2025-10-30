/**
 * @fileoverview Multer middleware configuration for handling file uploads to Cloudinary
 * Sets up multer with Cloudinary storage for direct streaming of uploads
 */

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.config.js';

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'hotel_images', // Cloudinary folder name
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Allowed image formats
        transformation: [{ 
            width: 1000, // Max width
            height: 1000, // Max height
            crop: 'limit' // Maintain aspect ratio
        }]
    }
});

// Create multer instance with configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB file size limit
        files: 10 // Maximum 10 files per upload
    },
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

export default upload;