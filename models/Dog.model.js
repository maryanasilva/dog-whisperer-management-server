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
    }
});

// Export the model
module.exports = model('Dog', dogSchema);