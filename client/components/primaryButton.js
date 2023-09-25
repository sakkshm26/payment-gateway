import { Button } from "@mui/material";
import React from "react";

const PrimaryButton = ({ text, onClick }) => {
    return (
        <Button
            sx={{
                backgroundColor: "#17102b",
                color: "#d2d2d2",
                padding: "7px 40px",
                "&:hover": { backgroundColor: "#241d38" },
                fontSize: 13,
                fontWeight: "600"
            }}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default PrimaryButton;
