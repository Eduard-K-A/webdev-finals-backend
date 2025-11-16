// Booking validation middleware
export const validateBooking = (req, res, next) => {
  const { room, checkInDate, checkOutDate, totalGuests, totalPrice } = req.body;
  if (!room || !checkInDate || !checkOutDate || !totalGuests || !totalPrice) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (new Date(checkInDate) >= new Date(checkOutDate)) {
    return res.status(400).json({ error: 'Check-out must be after check-in' });
  }
  if (totalGuests <= 0) {
    return res.status(400).json({ error: 'Total guests must be positive' });
  }
  if (totalPrice < 0) {
    return res.status(400).json({ error: 'Total price must be non-negative' });
  }
  next();
};
