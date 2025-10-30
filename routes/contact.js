const express = require('express');
const Contact = require('../models/contactModel');
const sendToWhatsapp = require('../utils/ContactApp.js');
const { protect } = require('../middlewares/middleware.js');

const router = express.Router();

// On post route
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

// On getting contact request by id
router.get('/:id', protect, async(req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if(!contact) return res.status(404).json({
      error: "Service not found/doesn't exist"
    })
    res.json(contact);
  } catch (error) {
    console.error('Failed to get contact request:', error)
    res.status(500).json({
      error: 'Failed to get contact request'
    });
  }
})

// On deleting contact request
router.delete('/:id', protect, async(req, res) =>{
  try {
    const contact = await Contact.findById(req.params.id);
    if(!contact) return res.status(404).json({
      error: "Service not found/doesn't exist"
    })
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Contact request deleted successufully!'
    });
  } catch (error){
    console.error('Failed to delete contact request:', error);
    res.status(500).json({
      message: 'failed to delete contact request'
    })
  }
})

module.exports = router;