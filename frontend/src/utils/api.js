import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    // baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true,
});

export default api;
