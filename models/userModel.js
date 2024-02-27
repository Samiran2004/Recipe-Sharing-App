const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profilepicture:{
        type: String,
        default: 'https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png'
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    recipeCount: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User',userSchema);
module.exports = User;