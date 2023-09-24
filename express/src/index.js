import express from "express";
import dotenv from "dotenv";
import { userRouter, paymentRouter, quickbooksRouter } from "./routers/index.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import auth from "./middlewares/auth.js";
import cors from "cors";
dotenv.config();

mongoose
    .connect("mongodb://127.0.0.1:27017/razorpay_clone")
    .then(() => console.log("Connected successfully"))
    .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/payment", auth, paymentRouter);
app.use("/quickbooks", quickbooksRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
