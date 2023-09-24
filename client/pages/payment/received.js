import React, { useContext, useEffect, useState } from "react";
import API from "../../constant/api";
import Payment from "../../components/payment";
import { useRouter } from "next/router";
import { AuthContext } from "../../auth/useAuth";
import Cookies from "js-cookie";

const sent = () => {
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);
    const router = useRouter();
    const { user } = useContext(AuthContext);

    const getPayments = async () => {
        try {
            const response = await API.get("/payment/received");
            setPayments(response.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };

    const handleSync = async () => {
        window.open(
            `https://appcenter.intuit.com/connect/oauth2?scope=openid%20com.intuit.quickbooks.accounting&client_id=${process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID}&response_type=code&access_type=offline&state=${JSON.parse(Cookies.get("user")).user_id}&redirect_uri=${process.env.NEXT_PUBLIC_QUICKBOOKS_CALLBACK_URL}`
        );
    };

    useEffect(() => {
        if (!user) router.push("/login");
        getPayments();
    }, []);

    return (
        <div>
            <button onClick={handleSync}>Sync Payments With Quickbooks</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                payments.length ? payments.map((payment, index) => (
                    <Payment key={index} payment={payment} />
                )) : <p>No payments received</p>
            )}
        </div>
    );
};

export default sent;
