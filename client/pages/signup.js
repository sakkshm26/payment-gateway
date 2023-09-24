import { useRouter } from "next/router";
import React, { useState } from "react";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../auth/useAuth";
import { useEffect } from "react";

const signup = () => {
    const [data, setData] = useState({ username: "", password: "" });
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { user, signup } = useContext(AuthContext);

    useEffect(() => {
        if (user) router.push("/dashboard");
        setLoading(false);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        signup(data);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        name="username"
                        placeholder="username"
                        type="text"
                        value={data.username}
                        onChange={(e) =>
                            setData({ ...data, username: e.target.value })
                        }
                        required={true}
                    />
                    <input
                        name="password"
                        placeholder="password"
                        type="password"
                        value={data.password}
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                        required={true}
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
            <ToastContainer theme="light" />
        </div>
    );
};

export default signup;
