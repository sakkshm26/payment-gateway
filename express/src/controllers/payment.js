import Payment from "../models/payment.js";

export const createPayment = async (req, res) => {
    try {
        const { amount, type, data } = req.body;

        const payment = await Payment.create({
            amount,
            type,
            data,
            user_id: req.user_id,
        });

        res.status(200).json(payment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong when creating a payment",
        });
    }
};

export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ user_id: req.user_id }); 

        res.status(200).json(payments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong when getting payments",
        });
    }
}

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
}