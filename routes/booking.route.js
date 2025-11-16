import express from 'express';
import { createBooking, getUserBookings, getAllBookings, cancelBooking } from '../controllers/booking.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validateBooking } from '../middleware/booking.validator.js';

const router = express.Router();

// /api/bookings
// User creates a booking (room id in body)
router.post('/bookings', authenticate, validateBooking, createBooking);

// User books a specific room by id in URL
router.post('/bookings/room/:roomId', authenticate, validateBooking, (req, res, next) => {
	req.body.room = req.params.roomId;
	next();
}, createBooking);

// User gets their bookings
router.get('/bookings', authenticate, getUserBookings);

// Admin gets all bookings
router.get('/bookings/all', authenticate, getAllBookings); // Add admin check if needed

// User cancels their booking
router.patch('/bookings/:id/cancel', authenticate, cancelBooking);

export default router;
