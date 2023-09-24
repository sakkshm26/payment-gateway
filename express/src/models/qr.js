import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    link: { type: String, required: true },
});

const QR = mongoose.model("QRCode", qrCodeSchema);

export default QR;
