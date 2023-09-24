import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, Enumerator: ["card", "upi"] },
    data: { type: Object },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
