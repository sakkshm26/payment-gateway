import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../auth/useAuth";
import { useRouter } from "next/router";
import { useState } from "react";
import API from "../constant/api";
import { Box, Button, CircularProgress } from "@mui/material";
import PrimaryButton from "../components/primaryButton";
import { Send, Clear, Chat } from "@mui/icons-material";
import CustomInput from "../components/customInput";
import { toast } from "react-toastify";
import axios from "axios";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line,
    ResponsiveContainer,
} from "recharts";

const dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        { text: "Hi! How can I help you?", sender: "bot" }
    ]);
    const [messageLoading, setMessageLoading] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();

    const [isChatbotOpen, setChatbotOpen] = useState(false);
    const [chartData, setChartData] = useState([]);

    const getDayOfWeek = (date) => {
        const dayOfWeek = new Date(date).getDay();
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek];
    };

    const toggleChatbot = () => {
        setChatbotOpen((prev) => !prev);
    };

    const getUsername = async () => {
        try {
            const response = await API.get("/user");
            setUsername(response.data.user.username);
            for (const payment of response.data.payment_data) {
                setChartData((prev) => [
                    ...prev,
                    {
                        name: getDayOfWeek(payment.date),
                        Amount: payment.amount,
                    },
                ]);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message?.length) {
            const text = message;
            setMessage("");
            setMessageLoading(true);
            setMessages(() => [...messages, { text, sender: "user" }]);
            try {
                if (message.length) {
                    const response = await axios.post(
                        "https://elated-lion-slacks.cyclic.cloud/getMessage",
                        { text }
                    );
                    setMessages(() => [
                        ...messages,
                        { text, sender: "user" },
                        { text: response.data.text, sender: "bot" },
                    ]);
                }
            } catch (err) {
                console.log(err);
                toast.error("Something went wrong");
            }
            setMessageLoading(false);
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
                    <h3>Dashboard</h3>

                    <Box height={20} />

                    <p>Logged in as {username}</p>

                    <Box sx={{ height: 35 }}></Box>

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
                    <Box
                        style={{ position: "fixed", bottom: 20, right: 20 }}
                        zIndex={5}
                    >
                        <PrimaryButton
                            text={<Chat />}
                            onClick={toggleChatbot}
                        />
                    </Box>
                    {isChatbotOpen && (
                        <Box
                            sx={{
                                position: "fixed",
                                bottom: 60,
                                right: 20,
                                background: "#1c1c1c",
                                borderRadius: 4,
                                padding: "15px 5px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: 350,
                                width: 280,
                            }}
                            zIndex={5}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    overflowY: "auto",
                                    padding: "10px",
                                    height: "100%",
                                }}
                            >
                                {messages.map((message, index) =>
                                    message.sender === "bot" ? (
                                        <Box
                                            key={index}
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
                                                    backgroundColor: "#363636",
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
                                            key={index}
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
                                                    backgroundColor: "#293656",
                                                    padding:
                                                        "7px 10px 8px 10px",
                                                    borderRadius: "5px"
                                                }}
                                            >
                                                {message.text}
                                            </Box>
                                        </Box>
                                    )
                                )}
                            </Box>
                            <Box height={30} />
                            <form
                                onSubmit={sendMessage}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                }}
                            >
                                <Box width={10} />
                                <CustomInput
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter your message"
                                    // style={{ width: "100%" }}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    {/* <Button
                                        sx={{ color: "white" }}
                                        onClick={toggleChatbot}
                                    >
                                        <Clear />
                                    </Button> */}
                                    {messageLoading ? (
                                        <CircularProgress
                                            size={22}
                                            sx={{ margin: "0 10px" }}
                                        />
                                    ) : (
                                        <Button
                                            sx={{ color: "white" }}
                                            type="submit"
                                        >
                                            <Send sx={{ fontSize: 22 }} />
                                        </Button>
                                    )}
                                </Box>
                            </form>
                        </Box>
                    )}
                    <Box height={80} />
                    <Box
                        sx={{
                            width: { xs: "100%", md: "60%" },
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <ResponsiveContainer width={"80%"} height={230}>
                            <LineChart
                                width={650}
                                height={300}
                                data={chartData}
                            >
                                <CartesianGrid vertical={false} opacity="0.2" />
                                <XAxis
                                    tick={{ fill: "white" }}
                                    axisLine={false}
                                    tickLine={false}
                                    dataKey="name"
                                />
                                <YAxis
                                    tickCount={7}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "white" }}
                                    type="number"
                                    domain={[0, 100]}
                                />
                                <Tooltip
                                    viewBox={{
                                        x: 0,
                                        y: 0,
                                        width: 20,
                                        height: 20,
                                    }}
                                    cursor={false}
                                    position="top"
                                    wrapperStyle={{ display: "hidden" }}
                                />
                                <Line
                                    fill="#40C0C0"
                                    stroke="#40C0C0"
                                    dot={true}
                                    type="monotone"
                                    dataKey="Amount"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                    <Box height={100} />
                </Box>
            )}
        </div>
    );
};

export default dashboard;
