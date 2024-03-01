const express = require('express');
const validator = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');
const {
    createRecipe,
    getAllRecipe,
    getAllByType
} = require('../controller/recipeController');
const router = express.Router();

//@Route:- POST  /api/recipe/create
//@Access:- Private
router.post('/create', validator, upload.single("recipeimages"), createRecipe);

//@Route:- GET  /api/recipe/get-all?page={}&limit={}
//@Access:- Public
router.get('/get-all', getAllRecipe);

//@Route:- GET  /api/recipe/get-all-type
//@Access:- Public
router.get('/get-all-type', getAllByType);

module.exports = router;