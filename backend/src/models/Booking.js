const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studio: { type: mongoose.Schema.Types.ObjectId, ref: 'Studio' },
  date: Date,
  hours: Number,
});

module.exports = mongoose.model('Booking', bookingSchema);
