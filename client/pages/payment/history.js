import React, { useEffect, useState } from 'react'
import API from '../../constant/api';

const history = () => {
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);

    const getPayments = async () => {
        try {
            const response = await API.get("/payment");
            setPayments(response.data);
            console.log(response.data)
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
            
        </div>
    )
}

export default history
