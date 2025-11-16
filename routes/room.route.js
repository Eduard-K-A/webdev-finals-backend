/**
 * Room API routes
 */
import express from 'express';
import { createRoom, getRooms, getRoomById, updateRoom } from '../controllers/room.controller.js';

const router = express.Router();

// POST /api/rooms - create a room
router.post('/rooms', createRoom);

// GET /api/rooms - list all rooms
router.get('/rooms', getRooms);

// GET /api/rooms/:id - get room by ID (uuid or _id)
router.get('/rooms/:id', getRoomById);

// PUT /api/rooms/:id - update room by ID (uuid or _id)
router.put('/rooms/:id', updateRoom);

export default router;
