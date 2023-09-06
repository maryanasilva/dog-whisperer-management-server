// Require Packages / Packages Funcionalities
const router = require("express").Router();
const mongoose = require("mongoose");

// Require Data Models
const Kennel = require("../models/Kennel.model");
const Dog = require("../models/Dog.model");

// HTTP Verbs: GET, POST, PUT, DELETE
// Since we're building a REST API, we're sending data via JSON, and using HTTP Requests for communication.

// GET route that gets all the kennels
router.get("/kennels", async (req, res) => {
  try {
    let allKennels = await Kennel.find().populate("dogs");
    res.json(allKennels);
  } catch (error) {
    res.json(error);
  }
});

// GET route that gets a specific kennels
router.get("/kennels/:kennelId", async (req, res) => {
  const { kennelId } = req.params;
  try {
    let foundKennel = await Kennel.findById(kennelId).populate("dogs");
    res.json(foundKennel);
  } catch (error) {
    res.json(error);
  }
});

// POST route to create a kennels
router.post("/kennels/addKennel", async (req, res) => {
  const { name, description, location, image } = req.body;
  try {
    let newKennel = await Kennel.create({
      name,
      description,
      location,
      image,
    });

    res.json(newKennel);
  } catch (error) {
    res.json(error);
  }
});

// GET route that gets the info of a specific kennels to update
router.get("/singlekennels/:kennelId", async (req, res) => {
  const { kennelId } = req.params;
  try {
    let foundKennel = await Dog.findById(kennelId).populate("dog");
    res.json(foundKennel);
  } catch (error) {
    res.json(error);
  }
});

// PUT route to update info of a kennels
router.put("/kennels/:kennelId", async (req, res) => {
  const { kennelId } = req.params;
  const { name, description, location, image } = req.body;
  try {
    let updateKennel = await Kennel.findByIdAndUpdate(
      kennelId,
      { name, description, location, image },
      { new: true }
    );
    res.json(updateKennel);
  } catch (error) {
    res.json(error);
  }
});

// DELETE route to delete a kennels
router.delete("/kennels/:kennelId", async (req, res) => {
  const { kennelId } = req.params;
  try {
    await Kennel.findByIdAndDelete(kennelId);
    res.json({ message: "Kennel deleted" });
  } catch (error) {
    res.json(error);
  }
});

// Exporting Express Router with all its routes
module.exports = router;
