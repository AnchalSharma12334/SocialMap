const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  const booking = await Booking.create(req.body);
  res.json(booking);
};

exports.getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.params.userId }).populate('studio');
  res.json(bookings);
};
