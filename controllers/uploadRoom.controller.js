/**
 * @fileoverview Controller for handling image uploads
 * Processes uploaded files and descriptions after Multer middleware
 */

/**
 * Handle multiple image uploads with description
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const handleUpload = async (req, res) => {
    try {
        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files were uploaded.'
            });
        }

        // Get description from request body
        const { description } = req.body;

        // Extract relevant data from uploaded files
        const uploadedImages = req.files.map(file => ({
            url: file.path, // Cloudinary secure URL
            publicId: file.filename, // Cloudinary public ID
            originalName: file.originalname
        }));

        // Log upload details
        console.log('Upload processed:', {
            description,
            numberOfImages: uploadedImages.length,
            images: uploadedImages
        });

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Upload successful',
            data: {
                description,
                images: uploadedImages
            }
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing upload',
            error: error.message
        });
    }
};