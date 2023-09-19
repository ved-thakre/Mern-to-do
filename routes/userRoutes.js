import express from 'express';
import { getAllUsers, register, getMyProfile, login, logout} from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);


export default router;