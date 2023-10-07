import paymentQueue from "../jobs/paymentQueue.js";
import Payment from "../models/payment.js";

export const createPayment = async (req, res) => {
    try {
        const { amount, type, data, receiver_id, date } = req.body;

        const days_difference = Math.abs(
            new Date(date).getDate() - new Date().getDate()
        );

        if (date) {
            paymentQueue.add(
                "paymentJob",
                {
                    amount,
                    type,
                    data,
                    receiver_id,
                    sender_id: req.user_id
                },
                { delay: days_difference * 24 * 60 * 60 * 1000 }
            );
            res.status(200).json({});
        } else {
            const payment = await Payment.create({
                amount,
                type,
                data,
                sender_id: req.user_id,
                receiver_id,
            });

            res.status(200).json(payment);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong when creating a payment",
        });
    }
};

export const getSentPayments = async (req, res) => {
    try {
        let payments = await Payment.find({ sender_id: req.user_id });

        payments = payments.map((payment) => {
            if (payment.type == "card") {
                payment.data.card_number = payment.data.card_number.slice(-4);
            }
            return payment;
        });

        res.status(200).json(payments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong when getting payments",
        });
    }
};

export const getReceivedPayments = async (req, res) => {
    try {
        let payments = await Payment.find({ receiver_id: req.user_id });

        payments = payments.map((payment) => {
            if (payment.type == "card") {
                payment.data.card_number = payment.data.card_number.slice(-4);
            }
            return payment;
        });

        res.status(200).json(payments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong when getting payments",
        });
    }
};

export const getPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.status(200).json(payment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong when creating a payment",
        });
    }
};
