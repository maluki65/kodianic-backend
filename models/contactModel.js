const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  Email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: Number, required: true },
  description: { type: String, required: true },
})

module.exports = mongoose.model('Contact', contactSchema);