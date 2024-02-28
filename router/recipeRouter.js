const express = require('express');
const validator = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');
const {
    createRecipe
} = require('../controller/recipeController');
const router = express.Router();

//@Route:- POST  /api/recipe/create
//@Access:- Private
router.post('/create', validator, upload.single("recipeimages"), createRecipe);

module.exports = router;