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
<<<<<<< HEAD
    }
=======
    },
    adoptionRequests: {
        type: Schema.Types.ObjectId,
        ref: "Adoptionrequest"
    },
    adoptionRequests: [{
        type: Schema.Types.ObjectId,
        ref: 'AdoptionRequest',
    }],
>>>>>>> 3b062739e89b1cec8be827ba2801b5a51e241164
});

// Export the model
module.exports = model('Dog', dogSchema);