const Recipe = require('../models/recipeModel');
const cloudinary = require('../middleware/cloudinaryModdleware');

const createRecipe = async (req, res) => {
    const { recipename, ingredients, description } = req.body;
    if (!recipename || !ingredients || !description) {
        return res.status(400).send({
            status: "Failed",
            message: "All fields are required."
        });
    }

    try {
        let recipeimages;
        const authorId = req.user._id;

        const result = await cloudinary.uploader.upload(req.file.path);
        recipeimages = result.url;

        const createdRecipe = await Recipe.create({ authorId, recipeimages, recipename, ingredients, description });
        
        console.log('Recipe created:', createdRecipe);
        
        res.status(201).send({
            status: "Success",
            message: "New recipe created",
            data: createdRecipe
        });
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).send({
            status: "Failed",
            message: "Failed to create recipe."
        });
    }
};


module.exports = {
    createRecipe
}