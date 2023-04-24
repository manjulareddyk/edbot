import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const chatMessageSchema = new mongoose.Schema({
    message_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    is_question: {
      type: Boolean,
      required: true
    }
});
const chatSessionSchema = new mongoose.Schema({
    session_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    session_title: {
        type: String,
        required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    messages: [chatMessageSchema]
  });
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
    // history:[{
    //     question: {
    //         type: String,
    //         required: true,
    //     },
    //     answer: {
    //         type: String,
    //         required: true,
    //     },
    //     completed: {
    //         type: Boolean,
    //         default: false,
    //     },
    //     createdAt: {
    //         type: Date,
    //         default: Date.now,
    //     },
    // }],
    history: [{chatSessionSchema,
        completed: {
            type: Boolean,  
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
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

userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.model("User", userSchema);