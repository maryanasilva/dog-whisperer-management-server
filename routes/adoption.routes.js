const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption.model'); // Import your Adoption model
const authMiddleware = require('../middleware/jwt.middleware'); // Authentication middleware

// Create a new adoption request
router.post('/adoption-requests', authMiddleware, async (req, res) => {
  try {
    const { dogId } = req.body;
    const userId = req.user.id; // Assuming you store user ID in req.user after authentication

    const adoption = new Adoption({
      user: userId,
      dog: dogId,
    });

    await adoption.save();
    res.status(201).json(adoption);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get adoption requests for a manager (assuming you have manager authentication logic)
router.get('/adoption-requests', authMiddleware, async (req, res) => {
  try {
    const managerId = req.user.id; // Assuming you have a manager ID in req.user

    const adoptionRequests = await Adoption.find({
      'dog.manager': managerId,
    })
      .populate('user', 'name') // Populate user details
      .populate('dog', 'name'); // Populate dog details

    res.json(adoptionRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
