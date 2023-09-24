import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export const userSignup = async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ username });

        if (user)
            return res
                .status(400)
                .json({ message: "User with same username already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        user = await User.create({ username, password: hashedPassword });

        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "60d",
        });

        res.status(200).json({
            user_id: user.id,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong during signup" });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ username });

        if (!user)
            return res
                .status(400)
                .json({ message: "User with this username does not exist" });

        const is_password_correct = await bcrypt.compare(
            password,
            user.password
        );

        if (!is_password_correct)
            return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "60d",
        });

        res.status(200).json({
            user_id: user.id,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong during login" });
    }
};
