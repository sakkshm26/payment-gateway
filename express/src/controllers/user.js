import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import Payment from "../models/payment.js";

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

export const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user_id);

        const dates = [];

        const start_date = new Date();
        start_date.setDate(start_date.getDate() - 6);
        let current_date = new Date(start_date.setHours(5, 30, 0, 0));
        const end_date = new Date(new Date().setHours(5, 30, 0, 0));

        while (current_date <= end_date) {
            dates.push(new Date(current_date));
            current_date.setDate(current_date.getDate() + 1);
        }

        const payments_data = await Payment.aggregate([
            {
                $match: {
                    sender_id: req.user_id,
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" },
                    },
                    date: {
                        $first: {
                            $dateFromParts: {
                                year: { $year: "$createdAt" },
                                month: { $month: "$createdAt" },
                                day: { $dayOfMonth: "$createdAt" },
                            },
                        },
                    },
                    amount: { $sum: "$amount" },
                },
            },
            {
                $sort: { date: 1 },
            },
            {
                $project: {
                    _id: 0,
                    date: 1,
                    amount: 1,
                },
            },
        ]);

        const payments_map = new Map();

        for (const payment of payments_data) {
            payments_map.set(new Date(payment.date).getDate(), payment.amount)
        }

        let payment_data = [];

        for (let date of dates) {
            const payments_count = payments_map.get(new Date(date).getDate());
            if (payments_count) payment_data.push({ date: date.getTime(), amount: payments_count }); 
            else payment_data.push({ date: date.getTime(), amount: 0 });
        }

        res.status(200).json({user, payment_data});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong when getting user data",
        });
    }
};
