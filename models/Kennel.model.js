const {Schema, model} = require('mongoose');

const kennelSchema = new Schema({
    name: String,
    description: String,
    location: String,
    image: String,
    dogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Dog'
    }]
});

// Export the model
module.exports = model('Kennel', kennelSchema);