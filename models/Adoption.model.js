const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  dog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dog', // Reference to the Dog model
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
});

module.exports = mongoose.model('Adoption', adoptionSchema);
