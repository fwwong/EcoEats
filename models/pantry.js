const mongoose = require('mongoose');

// parameter collection schema
const pantrySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date: Date,
        pantry: String,
        quantity: Number,
        expiry: Date,
    },
    // name of the collection in database
    { collection: 'pantry' }
);


const pantryModel = mongoose.model('Pantry', pantrySchema)

module.exports = pantryModel;