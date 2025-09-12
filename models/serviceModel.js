const mongoose = require('mongoose');

const ServiceSchema =  mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  Email: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: false, default: 'Price range' },
  serviceName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Service', ServiceSchema);