import { Box } from "@mui/material";
import React from "react";

const Payment = ({payment}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid white",
            }}
        >
            <p>Amount: {payment.amount}</p>
            <p>Type: {payment.type.toUpperCase()}</p>
            <Box>
                {payment.type == "card" ? (
                    <p>Card number: **** **** **** {payment.data.card_number}</p>
                ) : payment.type == "upi" ? (
                    <p>UPI ID: {payment.data.id}</p>
                ) : (
                    "quickbooks data"
                )}
            </Box>
        </Box>
    );
};

export default Payment;
