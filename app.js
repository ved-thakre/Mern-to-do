import express from "express";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import { connectDB } from "./data/database.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errros.js";
import cors from 'cors';

dotenv.config();
connectDB();
export const app = express();

// Using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
}))

// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Using error middleware
app.use(errorMiddleware)
