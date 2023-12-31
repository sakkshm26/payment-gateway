import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    sender_id: { type: String },
    receiver_id: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, Enumerator: ["card", "upi"] },
    data: { type: Object },
}, {
    timestamps: true,
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
