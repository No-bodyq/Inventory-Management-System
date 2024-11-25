import express from "express";
import { signup, login } from "../controllers/userController.js";

const userRouter = express.Router();

// User Signup
userRouter.post("/signup", signup);

// User Login
userRouter.post("/login", login);

export default userRouter;
