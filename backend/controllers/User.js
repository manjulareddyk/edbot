import {User} from "../models/users.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";
export const register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success:false,message: "user already exists"
            });
        }
        const otp = Math.floor(Math.random() * 100000);
        user = await User.create({
            name,
            email,
            password,
            phoneNumber,
            otp,
            otp_expiry:new Date( Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
        });
        await sendMail(email, "Verify your account", `Your OTP is ${otp}`);
        sendToken(
            res,
            user,
            201,
            "OTP sent to your email. Please verify your account"
        );
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}
export const verify = async (req, res) => {
    try {
        const otp = Number(req.body.otp);
        const user = await User.findOne(req.user._id);
        if(user.otp !== otp || user.otp_expiry < Date.now()) return res.status(400).json({success:false,message: "Invalid OTP"});
        user.verified = true;
        user.otp = undefined;
        user.otp_expiry = undefined;
        await user.save();
        sendToken(res, user, 200, "Account verified successfully");
    } catch (error) {
        res.status(500).json({success:false,message: error.message});
    }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }
    sendToken(res, user, 200, "Login Successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.headers });
  }
};
export const logout = async (req, res) => {
    try {
      res
        .status(200)
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .json({ success: true, message: "Logged out Successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.headers });
    }
  };
  
  export const newChat = async (req, res) => {
    try {
      const { question, answer } = req.body;
      const user = await User.findById(req.user._id);
      user.history.push({ 
        question, 
        answer,
        completed: false,
        createdAt: new Date(Date.now()),
       });
      await user.save();
      res.status(200).json({ success: true, message: "Chat saved" });

    } catch (error) {
      res.status(500).json({ success: false, message: error.headers });
    }
  };

  export const removeChat = async (req, res) => {
    try {
      const {chatId} = req.params;
      const user = await User.findById(req.user._id);
      user.history = user.history.filter((chat) => chat._id.toString() !== chatId.toString());
      await user.save();
      res.status(200).json({ success: true, message: "Chat removed successfully" });

    } catch (error) {
      res.status(500).json({ success: false, message: error.headers });
    }
  }

  export const updateChat = async (req, res) => {
    try {
      const {chatId} = req.params;
      const user = await User.findById(req.user._id);
      user.history = user.history.find((chat)=> chat._id.toString() === chatId.toString());
      user.history.completed = !user.history.completed;
      await user.save();
      res.status(200).json({ success: true, message: "Chat updated successfully" });

    } catch (error) {
      res.status(500).json({ success: false, message: error.headers });
    }
  }

  export const getMyProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      sendToken(res, user, 200, `Welcome back ${user.name}`);
    } catch (error) {
      res.status(500).json({ success: false, message: error.headers });
    }
  }

  export const getAnswer = async (req, res) => {
    try {
      const question = req.params.question;
      const stringArray = req.params.stringArray.split(",");
      res.send({question, answer: stringArray[Math.floor(Math.random() * stringArray.length)]});
    } catch (error) {
      res.status(500).json({ success: false, message: error.headers });
    }
  }