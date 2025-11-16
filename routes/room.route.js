/**
 * Room API routes
 */
import express from 'express';
import { createRoom, getRooms, getRoomById, updateRoom } from '../controllers/room.controller.js';
import { deleteImage } from '../controllers/deleteRoom.controller.js';
import { handleUpload } from '../controllers/uploadRoom.controller.js';
import upload from '../middleware/upload.validator.js';

const router = express.Router();

// POST /api/rooms - create a room
router.post('/rooms', createRoom);

// GET /api/rooms - list all rooms
router.get('/rooms', getRooms);

// GET /api/rooms/:id - get room by ID (uuid or _id)
router.get('/rooms/:id', getRoomById);

// PUT /api/rooms/:id - update room by ID (uuid or _id)
router.put('/rooms/:id', updateRoom);

// DELETE /api/upload/:publicId - delete image by public ID
router.delete('/upload/:publicId',deleteImage);

// POST /api/upload - upload images
router.post('/upload', 
    upload.array('images', 10), // Handle up to 10 images
    handleUpload
);

export default router;
