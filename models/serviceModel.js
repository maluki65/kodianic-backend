const mongoose = require('mongoose');

const ServiceSchema =  mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  Email: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  serviceName: { type: String, required: true },
})

module.exports = mongoose.model('Service', ServiceSchema);