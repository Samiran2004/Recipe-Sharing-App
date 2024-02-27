const express = require('express');
const upload = require('../middleware/multerMiddleware');
const validator = require('../middleware/authMiddleware');
const {
    signup,
    login,
    getUserDets
} = require('../controller/userController');
const router = express.Router();

//@route:- POST  /api/user/signup
//@access:- Public
router.post('/signup', upload.single("profilepicture"), signup);

//@route:- POST  /api/user/login
//@access:- Public
router.post('/login', login);

//@route:- GET  /api/user/get-user-dets
//@access:- Private
router.get('/get-user-dets', validator, getUserDets);

module.exports = router;