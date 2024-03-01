const Recipe = require('../models/recipeModel');
const cloudinary = require('../middleware/cloudinaryModdleware');
const deleteImage = require('../services/deleteCloudinaryImg');

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
        const public_id = public_id
        const createdRecipe = await Recipe.create({ authorId, recipeimages, recipename, ingredients, description, type, publicId: public_id });

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
    const Type = type.toLowerCase();
    try {
        const productData = await Recipe.find({ type: Type }).skip(skip).limit(limit);
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

//@Route:- PATCH  /api/recipe/update/:id
//@Access:- Private
const updateRecipe = async (req, res) => {
    const recipeId = req.params.id;
    const { recipename, ingredients, description, type } = req.body;
    if (!recipename || !ingredients || !description || !type) {
        res.status(400).send({
            status: "Failed",
            message: "All feilds are required"
        });
    } else {
        try {
            const recipeData = await Recipe.findById(recipeId);
            if (recipeData.authorId == req.user._id) {
                recipeData.recipename = recipename;
                recipeData.ingredients = ingredients,
                    recipeData.description = description,
                    recipeData.type = type;
                const updatedRecipeData = await recipeData.save();
                res.status(200).send({
                    status: "Success",
                    message: "Recipe updated",
                    data: updatedRecipeData
                });
            } else {
                res.status(404).send({
                    status: "Failed",
                    message: "User is not a valid author",
                });
            }
            res.status(200).send(recipeData);
        } catch (error) {
            res.status(404).send({
                status: "Failed",
                message: "Recipe can't be updated",
                error
            });
        }
    }
}

//@Route:- DELETE  /api/recipe/delete/:id
//@Access:- Private
const deleteRecipe = async (req, res) => {
    const recipeId = req.params.id;
    try {
        const recipeData = await Recipe.findById(recipeId);
        if (recipeData.authorId !== req.user._id) {
            res.status(400).send({
                status: "Failed",
                message: "You are not an author of this recipe"
            });
        } else {
            await deleteImage(recipeData.publicId);
            const deletedData = await Recipe.findByIdAndDelete(recipeId);
            res.status(200).send({
                status: "Success",
                message: "Recipe deleted successfully.",
                deletedData
            });
        }
    } catch (error) {
        res.status(404).send({
            status: "Failed",
            message: "Recipe can't be deleted."
        });
    }
}

module.exports = {
    createRecipe,
    getAllRecipe,
    getAllByType,
    updateRecipe,
    deleteRecipe
}