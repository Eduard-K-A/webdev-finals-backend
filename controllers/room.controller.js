/**
 * @fileoverview Controller for Room-related operations
 */
import Room from '../models/Room.js';

/**
 * Create a new room record
 * Expects body: { title, description, type, pricePerNight, maxPeople, amenities, photos }
 */
export const createRoom = async (req, res) => {
  try {
    const { title, description, type, pricePerNight, maxPeople, amenities, photos, isAvailable } = req.body;

    // Basic validation
    if (!title || !description || !type || !pricePerNight || !maxPeople) {
      return res.status(400).json({ message: 'Missing required room fields' });
    }

    // photos is expected to be an array of { url, publicId, originalName }
    const newRoom = new Room({
      title,
      description,
      type,
      pricePerNight,
      maxPeople,
      amenities: amenities || [],
      photos: photos || [],
      isAvailable: typeof isAvailable === 'boolean' ? isAvailable : true
    });

    await newRoom.save();
    return res.status(201).json({ message: 'Room created', room: newRoom });
  } catch (err) {
    console.error('createRoom error:', err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

/**
 * Get list of rooms
 * Optional query: ?available=true
 */
export const getRooms = async (req, res) => {
  try {
    const { available } = req.query;
    const filter = {};
    if (available === 'true') filter.isAvailable = true;
    if (available === 'false') filter.isAvailable = false;

    const rooms = await Room.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ rooms });
  } catch (err) {
    console.error('getRooms error:', err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};
