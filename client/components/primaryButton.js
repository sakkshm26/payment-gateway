import { Button } from "@mui/material";
import React from "react";

const PrimaryButton = ({ text, onClick, ...props }) => {
    return (
        <Button
            sx={{
                backgroundColor: "#1f1440",
                color: "#d2d2d2",
                padding: "7px 40px",
                "&:hover": { backgroundColor: "#30215c" },
                fontSize: 13,
                fontWeight: "600"
            }}
            onClick={onClick}
            {...props}
        >
            {text}
        </Button>
    );
};

export default PrimaryButton;
