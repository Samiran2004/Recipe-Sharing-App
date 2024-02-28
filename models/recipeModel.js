const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    authorId: {
        type: String
    },
    recipeimages: {
        type: String
    },
    recipename: {
        type: String
    },
    ingredients: {
        type: String
    },
    description: {
        type: String
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;