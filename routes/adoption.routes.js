const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption.model'); 

// POST route to handle adoption requests
router.post('/adoptions', async (req, res) => {
  try {
    const { dogId } = req.body;
   
    // Create a new adoption request
    const adoptionRequest = new Adoption({
      name: req.body.name, 
      email: req.body.email, 
      phoneNumber: req.body.phoneNumber,
      status: 'Pending', // initial status
    });

    // Save the adoption request to the database
    await adoptionRequest.save();

    await Adoption.findByIdAndUpdate(adoptionRequest._id, {
      $push:{ dogId: dogId}
    })

    res.status(201).json({ message: 'Adoption request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send adoption request' });
  }
});

router.get("/adoptions", async (req, res) => {
  try {
    let pendingAdoptions = await Adoption.find()
    res.json(pendingAdoptions);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
