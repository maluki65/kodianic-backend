const mongoose = require('mongoose');

const UserShema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
  role: {type: String, enum:['user', 'admin'], default: 'user'},
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Users', UserShema);