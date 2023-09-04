// Require Packages / Packages Funcionalities
const router = require("express").Router();
const mongoose = require("mongoose");

// Require Data Models
const Kennel = require("../models/Kennel.model");
const Dog = require("../models/Dog.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST route that creates a new Dog
router.post("/dogs", async (req, res) => {
  const { name, age, description, genre, size, image } = req.body;
  try {
    let response = await Kennel.create({
      name,
      age,
      description,
      genre,
      size,
      image,
    });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// GET route that gets all the dogs
router.get("/dogs", async (req, res) => {
  try {
    let allDogs = await Dog.find().populate("kennel");
    res.json(allDogs);
  } catch (error) {
    res.json(error);
  }
});

// GET route that gets the info of a specific dog
/* router.get("/dogs/:dogId", async (req, res) => {
  const { dogId } = req.params;
  try {
    let foundDog = await Dog.findById(dogId).populate("kennel");
    res.json(foundDog);
  } catch (error) {
    res.json(error);
  }
}); */

router.get("/dogs/:kennelId", async (req, res) => {
  const { kennelId } = req.params;
  try {
    let foundDog = await Kennel.findById(kennelId).populate("dogs");
    res.json(foundDog);
  } catch (error) {
    res.json(error);
  }
});

// HTTP Verbs: GET, POST, PUT, DELETE
// Since we're building a REST API, we're sending data via JSON, and using HTTP Requests for communication.
// PUT routes to update info of a kennel
router.put("/dogs/:dogId", async (req, res) => {
  const { dogId } = req.params;
  const { name, age, description, genre, size, image } = req.body;
  try {
    let updateDog = await Dog.findByIdAndUpdate(
      dogId,
      { name, age, description, genre, size, image },
      { new: true }
    );
    res.json(updateDog);
  } catch (error) {
    res.json(error);
  }
});

// DELETE route to delete a dog
router.delete("/dogs/:dogId", async (req, res) => {
  const { dogId } = req.params;
  try {
    await Dog.findByIdAndDelete(dogId);
    res.json({ message: "Dog deleted" });
  } catch (error) {
    res.json(error);
  }
});

router.post("/:kennelId/kennels", isAuthenticated, async (req, res) => {
  const { kennelId } = req.params;
  const { name, age, description, genre, size, image } = req.body;
  const user = req.payload;
  try {
    let newDog = await Dog.create({
      name,
      age,
      description,
      genre,
      size,
      image,
    });

    await Kennel.findByIdAndUpdate(kennelId, {
      $push: { dogs: newDog._id },
    });

    await Dog.findByIdAndUpdate(newDog._id, {
      $push: { kennel: kennelId },
    });

    await Dog.findByIdAndUpdate(newDog._id, {
      $push: { owner: user._id },
    });

    res.json(newDog);
  } catch (error) {
    res.json(error);
  }
});

// Exporting Express Router with all its routes
module.exports = router;
