const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // add more fields if you want (name, roles, etc)
});

module.exports = mongoose.model('User', userSchema);
