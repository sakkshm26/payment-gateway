import { createContext, useEffect, useState } from "react";
import decode from "jwt-decode";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext({
    user: null,
});

function useAuth() {
    const [user, setUser] = useState(Cookies.get("user"));

    const router = useRouter();

    const login = async (data) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
                data
            );
            Cookies.set("user", response.data);
            setUser(response.data);
            router.push("/dashboard");
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };

    const signup = async (data) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`,
                data
            );
            Cookies.set("user", response.data);
            setUser(response.data);
            router.push("/dashboard");
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };

    const logout = () => {
        Cookies.remove("user");

        router.push("/login");
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(Cookies.get("user"));
    }, []);

    return { user, logout, login, signup };
}

export const AuthProvider = ({ children }) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth} children={children} />;
};
