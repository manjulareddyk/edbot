import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        maxLength: [30, "Your name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Your password must be longer than 6 characters"],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // create multi dimensional array
    history:[{
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
    }],
    phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number"],
        trim: true,
        maxLength: [10, "Your phone number cannot exceed 10 characters"],
    },
    verified: {
        type: Boolean,
        default: false,
    },
    otp: Number,
    otp_expiry: Date,
    resetPasswordOtp: Number,
    resetPasswordOtpExpiry: Date,
});    

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 100,
    });
};

export const User = mongoose.model("User", userSchema);