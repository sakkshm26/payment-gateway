import { Box } from "@mui/material";
import React, { useState } from "react";

const pay = () => {

    const [paymentType, setPaymentType] = useState(null);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid white"
            }}
        >
        <button></button>
        </Box>
    );
};

export default pay;
