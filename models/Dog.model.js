const {Schema, model} = require('mongoose');

const dogSchema = new Schema({
    name: String,
    age: String,
    description: String,
    image: String,
    genre: String,
    size: String,
    kennel: {
        type: Schema.Types.ObjectId,
        ref: 'Kennel'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    adoptionRequests: {
        type: Schema.Types.ObjectId,
        ref: "Adoptionrequest"
    },
    adoptionRequests: [{
        type: Schema.Types.ObjectId,
        ref: 'AdoptionRequest',
    }],
});

// Export the model
module.exports = model('Dog', dogSchema);