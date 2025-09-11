const express = require('express');
const Contact = require('../models/contactModel');
const sendToWhatsapp = require('../utils/ContactApp.js');

const router = express.Router();

router.post('/', async(req, res) => {

  const contact = new Contact({
    ...req.body
  })
  
  try {
    const saved = await contact.save();

    //On sending to WhatsApp 
    const waResponse = await sendToWhatsapp(saved);

    if(!waResponse.success){
      console.warn('WhatsApp notification failed:', waResponse.error);
    }

    res.status(201).json({saved, waResponse});

  } catch (error) {
    res.status(400).json(
      {
        error: 'Failed to save data:', 
        details: error.message
      }
    )
  }
});

module.exports = router;