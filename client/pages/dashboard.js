import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../auth/useAuth";
import { useRouter } from "next/router";
import { useState } from "react";

const dashboard = () => {
    const [loading, setLoading] = useState(true);
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push("/login");
        else setLoading(false);
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
                    Dashboard
                    <button onClick={() => router.push("/payment/pay?receiver_id=testid123")}>Pay</button>
                    <button onClick={() => router.push("/payment/sent")}>Payments sent</button>
                    <button onClick={() => router.push("/payment/received")}>Payments received</button>
                    <button onClick={() => router.push(`/profile`)}>My Payment Page</button>
                    <button onClick={logout} style={{ width: 100 }}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default dashboard;
