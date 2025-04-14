import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ role }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            });

            const data = await res.json();
            if (data.success) {
                // optional: redirect based on role
                if (role === "Student") {
                    navigate("/student");
                } else if (role === "Teacher") {
                    navigate("/teacher");
                }
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
            className="w-[100%] max-w-[320px] flex flex-col gap-[1.2rem] p-[2rem] text-center login-form"
        >
            <h1 className="text-[3.0rem] mb-[1rem]">{role}</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:outline-none focus:ring-2 focus:ring-blue-400 invalid:focus:ring-red-400"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:outline-none focus:ring-2 focus:ring-blue-400 invalid:focus:ring-red-400"
            />

            <div className="flex items-center gap-[0.5rem] text-[1rem] justify-start ml-3">
                <input type="checkbox" id="remember" className="accent-black" />
                <label htmlFor="remember">Remember my password</label>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button type="submit" className="login-btn">LOGIN</button>
        </form>
    );
}
