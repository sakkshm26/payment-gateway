import { Box, Checkbox } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import API from "../../constant/api";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { AuthContext } from "../../auth/useAuth";
import { useSearchParams } from "next/navigation";
import PrimaryButton from "../../components/primaryButton";
import CustomInput from "../../components/customInput";
import Calendar from "react-calendar";
import "../../styles/Home.module.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.css";

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
    const [date, setDate] = useState(new Date());
    const [schedulePayment, setSchedulePayment] = useState(false);

    useEffect(() => {
        if (!user) router.push("/login");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const req_data = paymentType === "card" ? cardData : upiData;
            let data = {
                amount,
                data: req_data,
                type: paymentType,
                receiver_id: receiver_id,
            };
            if (schedulePayment) data = { ...data, date };
            const response = await API.post("/payment", data);
            if (schedulePayment) {
                toast.success("Payment scheduled successfully");
                setTimeout(() => {
                    router.push(`/dashboard`);
                }, 6000);
            } else {
                router.push(`/payment/success?id=${response.data._id}`);
            }
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
                margin: { xs: "70px 10% 0 10%", md: "100px 35% 0 35%" },
                padding: { xs: "20px 0 30px 0", md: "45px 0 65px 0" },
                boxShadow: "grey 0px 0px 50px -28px",
            }}
        >
            <ToastContainer theme="light" />
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
                    <Box sx={{ height: 40 }}></Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        Schedule Payment?
                        <Checkbox
                            sx={{ color: "grey" }}
                            checked={schedulePayment}
                            onChange={() =>
                                setSchedulePayment(!schedulePayment)
                            }
                        />
                    </Box>
                    <Box sx={{ height: 40 }}></Box>
                    {schedulePayment ? (
                        <Calendar
                            onChange={setDate}
                            value={date}
                            className="calendar"
                            minDate={new Date()}
                            maxDate={new Date(new Date().setDate(new Date().getDate() + 6))}
                        />
                    ) : null}
                    <Box sx={{ height: 40 }}></Box>
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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        Schedule Payment?
                        <Checkbox
                            sx={{ color: "grey" }}
                            checked={schedulePayment}
                            onChange={() =>
                                setSchedulePayment(!schedulePayment)
                            }
                        />
                    </Box>
                    <Box sx={{ height: 40 }}></Box>
                    {schedulePayment ? (
                        <Calendar
                            onChange={setDate}
                            value={date}
                            className="calendar"
                            minDate={new Date()}
                            maxDate={new Date(new Date().setDate(new Date().getDate() + 6))}
                        />
                    ) : null}
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
