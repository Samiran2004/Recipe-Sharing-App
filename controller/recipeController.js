const Recipe = require('../models/recipeModel');
const cloudinary = require('../middleware/cloudinaryModdleware');

const createRecipe = async (req, res) => {
    const { recipename, ingredients, description } = req.body;
    if (!recipename || !ingredients || !description) {
        res.status(404).send({
            status: "Failed",
            message: "All feilds are required."
        });
    } else {
        let recipeimages;
        const authorId = req.user._id;
        await cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                res.status(400).send({
                    status: "Failed",
                    message: "File uploaded failed."
                })
            } else {
                recipeimages = result.url;
            }
        });
        try {
            const createdRecipe = await Recipe.create({ authorId: authorId, recipeimages: recipeimages, recipename: recipename, ingredients: ingredients, description: description });
            console.log(recipeCount);
            res.status(201).send({
                status: "Success",
                message: "New recipe created",
                data: createdRecipe
            })
        } catch (error) {
            res.status(400).send({
                status: "Failed",
                message: "Post creation error."
            });
        }
    }
}

module.exports = {
    createRecipe
}