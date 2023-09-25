import { Box } from "@mui/material";
import React from "react";

const Payment = ({payment}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
                margin: "20px 35% 0 35%",
                padding: "30px 130px",
                boxShadow: "grey 0px 0px 50px -28px",
            }}
        >
            <p style={{ margin: "8px 0" }}>Amount: {payment.amount}</p>
            <p style={{ margin: "8px 0" }}>Type: {payment.type.toUpperCase()}</p>
            <Box>
                {payment.type == "card" ? (
                    <p style={{ margin: "8px 0" }}>Card number: **** **** **** {payment.data.card_number}</p>
                ) : payment.type == "upi" ? (
                    <p style={{ margin: "8px 0" }}>UPI ID: {payment.data.id}</p>
                ) : (
                    <p style={{ margin: "8px 0" }}>quickbooks data</p>
                )}
            </Box>
        </Box>
    );
};

export default Payment;
