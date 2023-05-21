const mongoose = require('mongoose');

// parameter collection schema
const savedRecipeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date: Date,
        recipe: String,
    },
    // name of the collection in database
    { collection: 'savedRecipe' }
);


const savedRecipeModel = mongoose.model('SavedRecipe', savedRecipeSchema)

module.exports = savedRecipeModel;