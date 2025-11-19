import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import User from '../models/User.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, totalGuests, totalPrice } = req.body;
    const user = req.user._id;

    // Check if room exists
    const foundRoom = await Room.findById(room);
    if (!foundRoom) return res.status(404).json({ error: 'Room not found' });

    // Check for overlapping bookings
    const overlapping = await Booking.findOne({
      room,
      $or: [
        { checkInDate: { $lt: new Date(checkOutDate) }, checkOutDate: { $gt: new Date(checkInDate) } }
      ]
    });
    if (overlapping) return res.status(400).json({ error: 'Room already booked for these dates' });

    const booking = new Booking({
      user,
      room,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalPrice
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const bookings = await Booking.find({ user: req.user._id }).populate('room');
    res.status(200).json(bookings);
  } catch (err) {
    console.error('[Booking] Error fetching user bookings:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('room');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: 'Cancelled' },
      { new: true }
    ).populate('room');
    if (!booking) return res.status(404).json({ error: 'Booking not found or unauthorized' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a booking
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    // Only allow updating certain fields
    const allowed = ['checkInDate', 'checkOutDate', 'totalGuests', 'totalPrice', 'status'];
    allowed.forEach(field => {
      if (req.body[field] !== undefined) booking[field] = req.body[field];
    });
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
