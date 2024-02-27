const User = require('../models/userModel');
const cloudinary = require('../middleware/cloudinaryModdleware');
const bcrypt = require('bcrypt');

//@route:- POST  /api/user/signup
//@access:- Public
const signup = async (req, res) => {
    let profilepictureURL;
    const { fullname, email, password, phone } = req.body;

    //Check if all required fields are provided
    if (!fullname || !email || !password || !phone) {
        res.status(401).send({
            status: "Failed",
            message: "All feilds are required."
        });
    } else {
        //Check if user is already exist in database or not
        const check = await User.findOne({ email: email });
        if (check) {
            res.status(400).send({
                status: "Failed",
                message: "User already exist."
            });
        } else {
            //Upload the profile picture on cloudinary
            await cloudinary.uploader.upload(req.file.path, function (err, result) {
                if (err) {
                    res.status(400).send({
                        status: "Failed",
                        message: "File uploaded failed."
                    })
                } else {
                    profilepictureURL = result.url;
                }
            });
            //Hash the given password
            const hashPassword = await bcrypt.hash(password, 10);
            try {
                //Save all detials in database
                const createdUser = await User.create({
                    fullname: fullname,
                    email: email,
                    password: hashPassword,
                    phone: phone,
                    profilepicture: profilepictureURL
                });
                res.status(201).send({
                    status: "Success",
                    message: "User created successfully",
                    userdata: { fullname: createdUser.fullname, email: createdUser.email, phone: createdUser.phone, profilepictureURL, _id: createdUser._id }
                });
            } catch (error) {
                res.status(404).send({
                    status: "Failed",
                    message: "Signup failed"
                });
            }
        }
    }
}

//@route:- POST  /api/user/login
//@access:- Public
const login = async (req, res) => {
    res.status(200).send({ message: "Login user" });
}

//@route:- GET  /api/user/get-user-dets
//@access:- Private
const getUserDets = async (req, res) => {
    res.status(200).send({ message: "User data" });
}

module.exports = {
    signup,
    login,
    getUserDets
}