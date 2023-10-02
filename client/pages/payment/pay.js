import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import API from "../../constant/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AuthContext } from "../../auth/useAuth";
import { useSearchParams } from "next/navigation";
import PrimaryButton from "../../components/primaryButton";
import CustomInput from "../../components/customInput";

const pay = () => {
    const [paymentType, setPaymentType] = useState(null);
    const [upiData, setUpiData] = useState({ id: "" });
    const [cardData, setCardData] = useState({
        card_number: "",
        expiry: "",
        name: "",
        cvv: "",
    });
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const receiver_id = useSearchParams().get("receiver_id");

    useEffect(() => {
        if (!user) router.push("/login");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const req_data = paymentType === "card" ? cardData : upiData;
            const response = await API.post("/payment", {
                amount,
                data: req_data,
                type: paymentType,
                receiver_id: receiver_id,
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
                borderRadius: 4,
                margin: {xs: "70px 10% 0 10%", md: "100px 35% 0 35%"},
                padding: {xs: "20px 0 30px 0", md: "45px 0 65px 0"},
                boxShadow: "grey 0px 0px 50px -28px",
            }}
        >
            {paymentType === null ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <p>Demo Payment Gateway</p>
                    <Box height={40} />
                    <PrimaryButton
                        text="Card"
                        onClick={() => setPaymentType("card")}
                    />
                    <Box height={30} />
                    <PrimaryButton
                        text="UPI"
                        onClick={() => setPaymentType("upi")}
                    />
                </Box>
            ) : paymentType === "card" ? (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CustomInput
                        name="amount"
                        type="number"
                        maxLength={10}
                        placeholder="Amount (INR)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required={true}
                    />
                    <Box sx={{ height: 20 }}></Box>
                    <Box sx={{ display: "flex" }}>
                        <CustomInput
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
                        <Box width={30} />
                        <CustomInput
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
                    <Box sx={{ height: 20 }}></Box>
                    <Box sx={{ display: "flex" }}>
                        <CustomInput
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
                        <Box width={30} />
                        <CustomInput
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
                    <Box height={40} />
                    <PrimaryButton
                        text="Pay"
                        type="submit"
                        disabled={loading}
                    />
                </form>
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
                    <CustomInput
                        name="amount"
                        type="number"
                        maxLength={10}
                        placeholder="Amount (INR)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required={true}
                    />
                    <Box sx={{ height: 20 }}></Box>
                    <CustomInput
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
                    <Box sx={{ height: 40 }}></Box>
                    <PrimaryButton
                        text="Pay"
                        type="submit"
                        disabled={loading}
                    />
                </form>
            )}
            {loading ? <p>Loading...</p> : null}
        </Box>
    );
};

export default pay;
