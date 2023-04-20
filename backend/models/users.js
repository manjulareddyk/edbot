import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};  

export const User = mongoose.model("User", userSchema);