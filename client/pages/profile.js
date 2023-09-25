import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../auth/useAuth';
import API from '../constant/api';
import { toast } from 'react-toastify';

const profile = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
      try {
        const response = await API.get("/user");
        console.log("response: ", response.data);
        setUserData(response.data);
      } catch (err) {
        console.log(err)
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    }

    useEffect(() => {
        if (!user) router.push("/login");
        getUserData();
    }, []);

    return (
        <div>
            {userData ? "" : "Loading..."}
        </div>
    )
}

export default profile
