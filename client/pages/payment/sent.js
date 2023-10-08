import React, { useContext, useEffect, useState } from "react";
import API from "../../constant/api";
import Payment from "../../components/payment";
import { useRouter } from "next/router";
import { AuthContext } from "../../auth/useAuth";
import { Box, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const sent = () => {
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);
    const router = useRouter();
    const { user } = useContext(AuthContext);

    const getPayments = async () => {
        try {
            const response = await API.get("/payment/sent");
            setPayments(response.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        if (!user) router.push("/login");
        getPayments();
    }, []);

    return (
        <div>
            {loading ? (
                <CircularProgress
                    size={22}
                    sx={{
                        position: "absolute",
                        top: "45%",
                        left: { xs: "45%", md: "49%" },
                        color: "#c06c6c"
                    }}
                />
            ) : payments.length ? (
                payments.map((payment, index) => (
                    <Payment key={index} payment={payment} />
                ))
            ) : (
                <p style={{ textAlign: "center", marginTop: 30 }}>
                    No payments made
                </p>
            )}
            <Box height={20} />
            <ToastContainer theme="light" />
        </div>
    );
};

export default sent;
