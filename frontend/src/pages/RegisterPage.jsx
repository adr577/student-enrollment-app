import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        try {
            const res = await fetch("http://localhost:5430/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password, role }),
            });

            const data = await res.json();
            if (data.success) {
                setSuccess(true);
                setTimeout(() => navigate(`/login/${role}`), 1500);
            } else {
                setError(data.message || "Registration failed.");
            }
        } catch (err) {
            console.error(err);
            setError("Server error. Try again.");
        }
    };

    return (
        <form
            onSubmit={handleRegister}
            className="h-screen w-full max-w-[320px] mx-auto p-8 flex-col gap-4 text-center flex items-center justify-center"
        >
            <h1 className="text-3xl font-bold mb-10">Create Account</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="p-3 rounded-xl border border-[#0f0f0f] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 rounded-xl border border-[#0f0f0f] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-3 rounded-xl border border-[#0f0f0f] focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && (
                <p className="text-green-600 text-sm">
                    Account created! Redirecting...
                </p>
            )}

            <button type="submit" className="login-btn">
                Register
            </button>
        </form>
    );
}
