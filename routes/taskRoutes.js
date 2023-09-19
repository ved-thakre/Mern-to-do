import express from 'express';
import { newTask } from '../controllers/taskController.js'
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router("/newtask", isAuthenticated, newTask);

export default router;