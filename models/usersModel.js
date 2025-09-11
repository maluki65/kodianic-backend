const mongoose = require('mongoose');

const UserShema = mongoose.Schema({
  username: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model('Users', UserShema);