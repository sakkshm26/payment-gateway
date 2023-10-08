import { useRouter } from "next/router";
import React, { useState } from "react";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../auth/useAuth";
import { useEffect } from "react";
import CustomInput from "../components/customInput";
import { Box, CircularProgress } from "@mui/material";
import PrimaryButton from "../components/primaryButton";

const signup = () => {
    const [data, setData] = useState({ username: "", password: "" });
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { user, signup } = useContext(AuthContext);
    const [submitLoad, setSubmitLoad] = useState(false);

    useEffect(() => {
        if (user) router.push("/dashboard");
        setLoading(false);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoad(true);

        await signup(data);

        setSubmitLoad(false);
    };

    return (
        <div>
            {loading ? (
                <CircularProgress
                    size={22}
                    sx={{ margin: "0 10px", color: "#c06c6c" }}
                />
            ) : (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box height={80} />
                    <CustomInput
                        name="username"
                        placeholder="Username"
                        type="text"
                        value={data.username}
                        onChange={(e) =>
                            setData({ ...data, username: e.target.value })
                        }
                        required={true}
                        maxLength={25}
                    />
                    <Box height={20} />
                    <CustomInput
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={data.password}
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                        required={true}
                        maxLength={25}
                    />
                    <Box height={50} />
                    <PrimaryButton text="Signup" type="submit" />
                    <Box height={10} />
                    <a href="/login" style={{ fontSize: 13, color: "grey" }}>
                        Or Login
                    </a>
                    <Box height={15} />
                    {submitLoad ? (
                        <CircularProgress
                            size={22}
                            sx={{
                                color: "#c06c6c",
                            }}
                        />
                    ) : null}
                </form>
            )}
            <ToastContainer theme="light" />
        </div>
    );
};

export default signup;
