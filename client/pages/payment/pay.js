import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../constant/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const pay = () => {
    const [paymentType, setPaymentType] = useState(null);
    const [upiData, setUpiData] = useState({ id: "" });
    const [cardData, setCardData] = useState({
        card_number: "",
        expiry: "",
        name: "",
        cvv: "",
    });
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const req_data = paymentType === "card" ? cardData : upiData;
            const response = await API.post("/payment", {
                amount,
                data: req_data,
                type: paymentType,
            });
            router.push(`/payment/success?id=${response.data._id}`);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid white",
            }}
        >
            {paymentType === null ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <button onClick={() => setPaymentType("card")}>Card</button>
                    <button onClick={() => setPaymentType("upi")}>UPI</button>
                </Box>
            ) : paymentType === "card" ? (
                <form onSubmit={handleSubmit}>
                    <input
                        name="amount"
                        type="number"
                        maxLength={10}
                        placeholder="Amount (INR)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required={true}
                    />
                    <Box sx={{ display: "flex" }}>
                        <input
                            name="card_number"
                            placeholder="Card Number"
                            type="text"
                            maxLength={16}
                            minLength={5}
                            value={cardData.card_number}
                            onChange={(e) =>
                                setCardData({
                                    ...cardData,
                                    card_number: e.target.value,
                                })
                            }
                            required={true}
                        />
                        <input
                            name="expiry"
                            placeholder="Expiry"
                            type="text"
                            maxLength={5}
                            value={cardData.expiry}
                            onChange={(e) =>
                                setCardData({
                                    ...cardData,
                                    expiry: e.target.value,
                                })
                            }
                            required={true}
                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <input
                            name="name"
                            placeholder="Card Holder's Name"
                            type="text"
                            maxLength={25}
                            value={cardData.name}
                            onChange={(e) =>
                                setCardData({
                                    ...cardData,
                                    name: e.target.value,
                                })
                            }
                            required={true}
                        />
                        <input
                            name="cvv"
                            placeholder="CVV"
                            type="text"
                            maxLength={3}
                            value={cardData.cvv}
                            onChange={(e) =>
                                setCardData({
                                    ...cardData,
                                    cvv: e.target.value,
                                })
                            }
                            required={true}
                        />
                    </Box>
                    <button type="submit" disabled={loading}>
                        Pay
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        name="amount"
                        type="number"
                        maxLength={10}
                        placeholder="Amount (INR)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required={true}
                    />
                    <input
                        name="id"
                        placeholder="UPI ID"
                        type="text"
                        maxLength={25}
                        value={upiData.id}
                        onChange={(e) =>
                            setUpiData({
                                ...upiData,
                                id: e.target.value,
                            })
                        }
                        required={true}
                    />
                    <button type="submit" disabled={loading}>
                        Pay
                    </button>
                </form>
            )}
            {loading ? <p>Loading...</p> : null}
        </Box>
    );
};

export default pay;
