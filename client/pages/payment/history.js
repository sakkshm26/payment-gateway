import React, { useEffect, useState } from 'react'
import API from '../../constant/api';
import Payment from '../../components/payment';

const history = () => {
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);

    const getPayments = async () => {
        try {
            const response = await API.get("/payment");
            setPayments(response.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };


    useEffect(() => {
        getPayments();
    }, [])

    return (
        <div>
            {loading ? <p>Loading...</p> : payments.map(payment => <Payment payment={payment} />)}
        </div>
    )
}

export default history
