const {Schema, model} = require('mongoose');

const adoptionSchema = new Schema({
  dogId: {
    type: Schema.Types.ObjectId,
    ref: 'Dog', // Reference to the Dog model
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
});

module.exports = model('Adoption', adoptionSchema);
