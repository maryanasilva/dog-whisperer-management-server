const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption.model'); 

// POST route to handle adoption requests
router.post('/adoptions', async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      // Check if user is authenticated and _id is available
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { dogId } = req.body;
    const userId = req.user._id;

    // Create a new adoption request
    const adoptionRequest = new Adoption({
      dog: dogId,
      user: userId,
      name: req.body.name, 
      email: req.body.email, 
      phoneNumber: req.body.phoneNumber,
      status: 'Pending', // initial status
    });

    // Save the adoption request to the database
    await adoptionRequest.save();

    res.status(201).json({ message: 'Adoption request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send adoption request' });
  }
});

module.exports = router;
