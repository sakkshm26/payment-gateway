import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../auth/useAuth";
import { useRouter } from "next/router";
import { useState } from "react";
import API from "../constant/api";
import { Box } from "@mui/material";
import PrimaryButton from "../components/primaryButton";

const dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState();
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();

    const getUsername = async () => {
        try {
            const response = await API.get("/user");
            setUsername(response.data.username);
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        if (!user) router.push("/login");
        else getUsername();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 3,
                    }}
                >
                    <h4>Dashboard</h4>

                    <p>Logged in as {username}</p>

                    <Box sx={{ height: 25 }}></Box>

                    <PrimaryButton
                        text="Pay"
                        onClick={() =>
                            router.push("/payment/pay?receiver_id=testid123")
                        }
                    />

                    <Box sx={{ height: 25 }}></Box>

                    <PrimaryButton text="Payments Sent" onClick={() => router.push("/payment/sent")} />

                    <Box sx={{ height: 25 }}></Box>

                    <PrimaryButton text="Payments received" onClick={() => router.push("/payment/received")} />

                    <Box sx={{ height: 25 }}></Box>

                    <PrimaryButton text="Logout" onClick={logout} style={{ width: 100 }} />
                </Box>
            )}
        </div>
    );
};

export default dashboard;
