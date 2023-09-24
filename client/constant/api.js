import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

API.interceptors.request.use((req) => {
    req.headers.authorization = `Bearer ${
        JSON.parse(Cookies.get("user")).token
    }`;

    return req;
});

export default API;
