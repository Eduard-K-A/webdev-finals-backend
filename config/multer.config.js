import multer from 'multer';
import path from 'path';

// Set up storage engine   
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'HotelReservationSystem-WebdevFinals/'); // Create an 'HotelReservationSystem-WebdevFinals/' folder in project root
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
}); 

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Not an image! Please upload an image.'), false); // Reject file
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter
});

export default upload;