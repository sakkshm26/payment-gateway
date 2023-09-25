import { useRouter } from "next/router";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../auth/useAuth";
import { useContext } from "react";
import { useEffect } from "react";
import CustomInput from "../components/customInput";
import PrimaryButton from "../components/primaryButton";
import { Box } from "@mui/material";

const login = () => {
    const [data, setData] = useState({ username: "", password: "" });
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { user, login } = useContext(AuthContext);

    useEffect(() => {
        if (user) router.push("/dashboard");
        setLoading(false);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        login(data);
    };

    return (
        <div>
            {loading ? (
                <p>Loading....</p>
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
                    <PrimaryButton text="Login" type="submit" />
                    <Box height={10} />
                    <a href="/signup" style={{ fontSize: 13, color: "grey" }}>Or Signup</a>
                </form>
            )}
            <ToastContainer theme="light" />
        </div>
    );
};

export default login;
