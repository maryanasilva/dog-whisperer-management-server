// Require Packages / Packages Funcionalities
const router = require('express').Router();
const mongoose = require('mongoose');

// Require Data Models
const Kennel = require('../models/Kennel.model');
const Dog = require('../models/Dog.model');

// POST route that creates a new kennel
router.post('/kennels', async (req,res) => {
    const {name, description, location, image} = req.body;
    try {
        let response = await Kennel.create({name, description, location, image, dogs:[]});
        res.json(response);
    }
    catch (error) {
        res.json(error);
    }
});

// GET route that gets all the kennels
router.get('/kennels', async (req,res) => {
    try {
        let allKennels = await Kennel.find().populate('dogs');
        res.json(allKennels);
    }
    catch (error) {
        res.json(error);
    }
});

// GET route that gets the info of a specific project
router.get('/kennels/:kennelId', async (req,res) => {
    const {kennelId} = req.params;
    try {
        let foundKennel = await Kennel.findById(kennelId).populate('dogs');
        res.json(foundKennel)
    }
    catch (error) {
        res.json(error)
    }
});

// HTTP Verbs: GET, POST, PUT, DELETE
// Since we're building a REST API, we're sending data via JSON, and using HTTP Requests for communication.
// PUT routes to update info of a kennel
router.put('/kennels/:kennelId', async (req,res) => {
    const {kennelId} = req.params;
    const {name, description, location, image}= req.body;
    try {
        let updateKennel = await Kennel.findByIdAndUpdate(kennelId, {name, description, location, image}, {new: true});
        res.json(updateKennel);
    }
    catch (error) {
        res.json(error);
    }
});

// DELETE route to delete a kennel
router.delete('/kennels/:kennelId', async (req,res) => {
    const {kennelId} = req.params;
    try {
        await Kennel.findByIdAndDelete(kennelId);
        res.json({message: 'Kennel deleted'});
    }
    catch (error) {
        res.json(error);
    }
});

router.post('/:kennelId/dogs', async (req,res) => {
    const {kennelId} = req.params;
    const {name, description, location, image} = req.body;
    try {
        let newDog = await Dog.create({name, description, location, image, kennel: kennelId});

        let response = await Kennel.findByIdAndUpdate(kennelId, {$push: {dogs: newDog._id}});

        res.json(response);
    }
    catch (error) {
        res.json(error);
    }
});


// Exporting Express Router with all its routes
module.exports = router;