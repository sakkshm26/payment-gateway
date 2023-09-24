import { Router } from "express";
import { userSignup, userLogin, getUserData } from "../controllers/index.js";

const userRouter = Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/", getUserData);

export default userRouter;
