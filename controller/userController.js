const User = require('../models/userModel');
const cloudinary = require('../middleware/cloudinaryModdleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../services/mailServices');
const otpgenerator = require('otp-generator');
const OTP = require('../models/otpModel');
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
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            status: "Failed",
            message: "All fields are required"
        });
        return;
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(400).json({
                status: "Failed",
                message: "User with this email does not exist."
            });
            return;
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
            const payload = {
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                _id: user._id,
                profilepicture: user.profilepicture
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
            res.status(200).json({
                status: "Success",
                message: "Login successful",
                token
            });
        } else {
            res.status(400).json({
                status: "Failed",
                message: "Invalid password."
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failed",
            message: "Login failed"
        });
    }
};

//@route:- GET  /api/user/get-user-dets
//@access:- Private
const getUserDets = async (req, res) => {
    res.status(200).send({
        status: "Success",
        data: req.user
    });
}

//@route:- PUT  /api/user/update
//@access:- Private
const updateUserDets = async (req, res) => {
    try {
        const updatedDetials = await User.findByIdAndUpdate(req.user._id, req.body);
        res.status(201).send({
            status: "Success",
            message: "User updated",
            data: {
                fullname: updatedDetials.fullname,
                email: updatedDetials.email,
                phone: updatedDetials.phone,
                _id: updatedDetials._id
            }
        });
    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: "Update user detials failed.",
            error
        });
    }
}

//@route:- POST  /api/user/otp
//@access:- Public
const sendOtp = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        res.status(404).send({
            status: "Failed",
            message: "Email is required"
        })
    } else {
        const otp = otpgenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        try {
            await OTP.create({ email: email, otp: otp });
            await sendMail(email, "Password reset OTP", `Your OTP: ${otp} is valid till 30s`);
            res.status(200).send({
                status: "Success",
                message: "OTP send"
            });
        } catch (error) {
            res.status(400).send({
                status: "Failed",
                message: "OTP sending error."
            });
        }
    }
}

//@route:- PUT  /api/user/change-password
//@access:- Public
const changePassword = async (req, res) => {
    const { email, otp, newpassword } = req.body;
    if (!email || !otp || !newpassword) {
        return res.status(400).send({
            status: "Failed",
            message: "All fields are required"
        });
    }
    try {
        const otpData = await OTP.findOne({ email: email });
        if (!otpData || otpData.otp !== otp) {
            return res.status(401).send({
                status: "Failed",
                message: "OTP verification failed."
            });
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10);
        const updatedData = await User.findOneAndUpdate(
            { email: email },
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).send({
                status: "Failed",
                message: "Provided email does not exist"
            });
        }

        return res.status(200).send({
            status: "Success",
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            status: "Failed",
            message: "Internal Server Error"
        });
    }
};


module.exports = {
    signup,
    login,
    getUserDets,
    updateUserDets,
    sendOtp,
    changePassword
}