const express = require('express');
const Service = require('../models/serviceModel');
const sendToWhatsapp = require('../utils/ContactApp.js');
const{ protect } = require('../middlewares/middleware.js');

const router = express.Router();

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

module.exports = router;