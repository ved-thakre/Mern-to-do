import express from 'express';
import { newTask, getMyTasks, updateTask, deleteTask } from "../controllers/taskController.js";
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/mytasks", isAuthenticated, getMyTasks);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;