import express from 'express';
import {
    register,
    verify,
    login,
    logout,
    newChat,
    updateChat,
    removeChat,
} from '../controllers/User.js';

import { isAuthenticated } from '../middleware/auth.js';


const router = express.Router();



router.route("/register").post(register);

router.route("/verify").post(isAuthenticated, verify);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/newChat").post(isAuthenticated, newChat);

router
    .route("/newChat/:chatId")
    .get(isAuthenticated, updateChat)
    .delete(isAuthenticated, removeChat)
// router.route("/updateProfile").put(isAuthenticated, updateProfile);

//  router.route("/updatePassword").put(isAuthenticated, updatePassword);

export default router;