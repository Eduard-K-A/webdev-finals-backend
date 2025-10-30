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

export default router;
