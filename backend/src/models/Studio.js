const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  hourlyRate: Number,
  availability: [Date] // optional if using a separate schedule system
});

module.exports = mongoose.model('Studio', studioSchema);
