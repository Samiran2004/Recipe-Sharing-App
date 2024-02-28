const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: '30s',
        default: Date.now
    }
}, { timestamps: true });

const OTP = mongoose.model('OTP', otpSchema);
module.exports = OTP;