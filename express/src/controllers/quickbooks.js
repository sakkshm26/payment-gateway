import axios from "axios";
import dotenv from "dotenv";
import Payment from "../models/payment.js";
dotenv.config();

export const syncPayments = async (req, res) => {
    try {
        const { code, realmId, state } = req.query;

        const data = new URLSearchParams();
        data.append("code", code);
        data.append("grant_type", "authorization_code");
        data.append("redirect_uri", process.env.QUICKBOOKS_CALLBACK_URL);

        const response = await axios.post(
            "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
            data,
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        process.env.QUICKBOOKS_CLIENT_ID +
                            ":" +
                            process.env.QUICKBOOKS_CLIENT_SECRET,
                        "binary"
                    ).toString("base64")}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { access_token } = response.data;

        const payments_response = await axios.get(
            `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/query?query=select%20*%20from%20Payment%20Where%20Metadata.LastUpdatedTime%3E%272015-01-16%27%20Order%20By%20Metadata.LastUpdatedTime&minorversion=65`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        const payments = payments_response.data.QueryResponse.Payment

        payments.map(async payment => {
            await Payment.create({
                amount: payment.TotalAmt,
                type: "quickbooks",
                data: payment,
                receiver_id: state
            })
        })

        res.redirect(`${process.env.CLIENT_URL}/payment/history`);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong when syncing payments",
        });
    }
};
