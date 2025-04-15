import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ role }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await res.json();
            if (data.success) {
                if (data.role === "student") navigate("/student");
                else if (data.role === "teacher") navigate("/teacher");
            } else {
                setError(data.message || "Login failed.");
            }
        } catch (err) {
            console.error(err);
            setError("Server error. Try again.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-[320px] flex flex-col gap-[1.2rem] p-[2rem] text-center login-form"
        >
            <h1 className="text-[3.0rem] mb-[1rem]">{role}</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex items-center gap-2 text-[1rem] justify-start ml-3">
                <input
                    type="checkbox"
                    id="remember"
                    className="accent-black"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="remember">Remember my password</label>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
                type="submit"
                className="login-btn"
                disabled={loading}
            >
                {loading ? "Logging in..." : "LOGIN"}
            </button>
            {/* <p className="text-sm mt-2">
                Don't have an account?{" "}
                <a href="/register" className="text-black underline hover:text-gray-500">Register here</a>
            </p> */}
        </form>
    );
}
