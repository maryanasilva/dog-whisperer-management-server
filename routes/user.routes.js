// Require Packages / Packages Funcionalities
const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// Require Data Models
const User = require("../models/User.model");

// GET route that gets the user profile
router.get("/profile", isAuthenticated, async (req, res) => {
  const user = req.payload;
  try {
    let userInfo = await User.findById(user._id);
    res.json(userInfo);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
