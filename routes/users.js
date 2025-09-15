const express = require('express');
const authController = require('../controllers/authController');
const { protect, csrfProtection } = require ('../middlewares/middleware');
const crypto = require('crypto');

const router = express.Router();

// On authenticating signIn & signIn routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/profile', protect, csrfProtection, authController.getProfile);

router.get('/csrf-token', (req, res) => {
  const token = crypto.randomBytes(32).toString
})

module.exports = router;