import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../auth/useAuth";
import { useRouter } from "next/router";
import { useState } from "react";
import API from "../constant/api";
import { Box, Button } from "@mui/material";
import PrimaryButton from "../components/primaryButton";
import { ArrowForwardIos, Clear } from "@mui/icons-material";

const dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState();
    const [messages, setMessages] = useState([]);
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();

    const [isChatbotOpen, setChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setChatbotOpen((prev) => !prev);
    };

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

                    <PrimaryButton
                        text="Payments Sent"
                        onClick={() => router.push("/payment/sent")}
                    />

                    <Box sx={{ height: 25 }}></Box>

                    <PrimaryButton
                        text="Payments received"
                        onClick={() => router.push("/payment/received")}
                    />

                    <Box sx={{ height: 25 }}></Box>

                    <PrimaryButton
                        text="Logout"
                        onClick={logout}
                        style={{ width: 100 }}
                    />

                    {/* Button placed at the bottom right */}
                    <Box style={{ position: "fixed", bottom: 20, right: 20 }}>
                        <PrimaryButton
                            text="Your Button"
                            onClick={toggleChatbot}
                        />
                    </Box>
                    {isChatbotOpen && (
                        <Box
                            sx={{
                                position: "fixed",
                                bottom: 20,
                                right: 20,
                                background: "#0b0b0b",
                                // boxShadow: "grey 0px 0px 50px -28px",
                                borderRadius: 4,
                                padding: "15px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: 350, // Fixed height for the chatbot container
                                width: 280,
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    overflowY: "auto",
                                    padding: "15px",
                                }}
                            >
                                {messages.map((message) =>
                                    message.sender === "bot" ? (
                                        <Box
                                            key={message.id}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                            }}
                                        >
                                            <Box
                                                component="p"
                                                sx={{
                                                    margin: "0 0 15px 0",
                                                    fontSize: 13,
                                                    marginRight: 5,
                                                    backgroundColor: "#2c2c2c",
                                                    padding:
                                                        "7px 10px 8px 10px",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                {message.text}
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box
                                            key={message.id}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            <Box
                                                component="p"
                                                sx={{
                                                    margin: "0 0 15px 0",
                                                    fontSize: 13,
                                                    marginLeft: 5,
                                                    backgroundColor: "#2c2c2c",
                                                    padding:
                                                        "7px 10px 8px 10px",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                {message.text}
                                            </Box>
                                        </Box>
                                    )
                                )}
                            </Box>
                            <Box height={30} />
                            <Box
                                sx={{
                                    width: "85%",
                                    height: 4,
                                    backgroundColor: "#2b2b2b",
                                }}
                            />
                            <Box height={30} />
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "flex-end",
                                }}
                            >
                                <Button sx={{ color: "white" }}>
                                    <Clear />
                                </Button>
                                <Button sx={{ color: "white" }}>
                                    <ArrowForwardIos />
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            )}
        </div>
    );
};

export default dashboard;
