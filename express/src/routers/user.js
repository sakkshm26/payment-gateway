import { Router } from "express";
import { userSignup, userLogin } from "../controllers/index.js";

const userRouter = Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);

export default userRouter;
