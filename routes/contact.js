const express = require('express');
const Contact = require('../models/contactModel');
const sendToWhatsapp = require('../utils/ContactApp.js');
const { protect } = require('../middlewares/middleware.js');

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

// On get route
router.get('/', protect, async(req, res) => {
  try {
    const contacts = await Contact.find().sort({createdAt: -1});
    res.json(contacts);
  } catch (error) {
    console.error('Error in getting contacts', error);
    res.status(500).json({ error: 'Failed to fetch contacts'})
  }
})

module.exports = router;