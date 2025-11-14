/**
 * Room API routes
 */
import express from 'express';
import { createRoom, getRooms } from '../controllers/room.controller.js';

const router = express.Router();

// POST /api/rooms - create a room
router.post('/rooms', createRoom);

// GET /api/rooms - list rooms
router.get('/rooms', getRooms);

//PUT /api/rooms/:id - update room
router.put('/rooms/:id', createRoom);

export default router;
