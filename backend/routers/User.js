import express from 'express';
import {
    register,
    verify,
    login,
    logout,
    newChat,
    updateChat,
    removeChat,
    getMyProfile,
    getAnswer
    

} from '../controllers/User.js';

import { isAuthenticated } from '../middleware/auth.js';


const router = express.Router();



router.route("/register").post(register);

router.route("/verify").post(isAuthenticated, verify);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").post(isAuthenticated, getMyProfile);
router.route("")
router
    .route("/newChat/:chatId")
    .get(isAuthenticated, updateChat)
    .delete(isAuthenticated, removeChat)
router.route("/getAnswer").post(isAuthenticated, getAnswer);


export default router;