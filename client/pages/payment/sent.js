import React, { useContext, useEffect, useState } from "react";
import API from "../../constant/api";
import Payment from "../../components/payment";
import { useRouter } from "next/router";
import { AuthContext } from "../../auth/useAuth";

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
                <p>Loading...</p>
            ) : (
                payments.length ? payments.map((payment, index) => (
                    <Payment key={index} payment={payment} />
                )) : <p>No payments made</p>
            )}
        </div>
    );
};

export default sent;
