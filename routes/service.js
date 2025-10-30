const express = require('express');
const Service = require('../models/serviceModel');
const sendToWhatsapp = require('../utils/ContactApp.js');
const{ protect } = require('../middlewares/middleware.js');

const router = express.Router();

// On post route
router.post('/', async(req, res) => {

  const service = new Service({
    ...req.body
  })

  try {
    const saved = await service.save();

    //On sending to WhatsApp
    const waResponse = await sendToWhatsapp(saved);

    if(!waResponse.success){
      console.warn('WhatsApp notification failed:', waResponse.error);
    }

    res.status(201).json({saved, waResponse});
    
  } catch (error) {
    res.status(400).json(
      {
        error: 'Failed to save data',
        details: error.message
      }
    )
  }
});

// On get route
router.get('/', protect, async(req, res) => {
  try {
    const services =  await Service.find().sort({createdAt: -1});
    res.json(services);
  } catch (error) {
    console.error('Error in getting service requests', error);
    res.status(500).json({ error: 'Failed to fetch ervice requests'})
  }
})

// On getting service by id
router.get('/:id', protect, async(req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({
      error: "Service not found/doesn't exist"
    });
    res.json(service);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get service request'
    });
  }
})

// On deleting a service request
router.delete('/:id', protect, async(req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if(!service) {
      return res.status(404).json({
        error: "Service not found/doesn't exist"
      });
    }
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Service request deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service request', error);
    res.status(500).json({
      message: 'Failedto delete service request'
    });
  }
})

module.exports = router;