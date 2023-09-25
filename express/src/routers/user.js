import { Router } from "express";
import { userSignup, userLogin, getUserData } from "../controllers/index.js";
import auth from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/", auth, getUserData);

export default userRouter;
