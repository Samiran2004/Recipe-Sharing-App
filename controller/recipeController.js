const Recipe = require('../models/recipeModel');
const cloudinary = require('../middleware/cloudinaryModdleware');

const createRecipe = async (req, res) => {
    const { recipename, ingredients, description, type } = req.body;
    if (!recipename || !ingredients || !description || !type) {
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

        const createdRecipe = await Recipe.create({ authorId, recipeimages, recipename, ingredients, description, type });

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

//@Route:- POST  /api/recipe/get-all?page={}&limit={}
//@Access:- Public
const getAllRecipe = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;
        const recipeData = await Recipe.find().skip(skip).limit(limit);
        res.status(200).send({
            status: "Success",
            data: recipeData
        })
    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: "Recipe not found.",
            error
        });
    }
}

//@Route:- GET  /api/recipe/get-all-type?type={}?page={}?limit={}
//@Access:- Public
const getAllByType = async (req, res) => {
    const type = req.query.type;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;
    try {
        const productData = await Recipe.find({ type }).skip(skip).limit(limit);
        res.status(200).send({
            status: "Success",
            data: productData
        });
    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: "Recipe not found.",
            error
        });
    }
}


module.exports = {
    createRecipe,
    getAllRecipe,
    getAllByType
}