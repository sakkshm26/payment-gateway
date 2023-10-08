import { Input } from "@mui/material";
import React from "react";

const CustomInput = ({
    name,
    type,
    maxLength,
    minLength,
    placeholder,
    value,
    onChange,
    required,
    style
}) => {
    return (
        <Input
            name={name}
            type={type}
            maxLength={maxLength}
            minLength={minLength || 1}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            sx={{ color: "white", borderBottom: "1px solid #2b2b2b", fontSize: 14, padding: "0 10px" }}
            style={style}
        />
    );
};

export default CustomInput;
