import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function SignOut() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);

        const res = await fetch("http://localhost:5430/api/logout", {
            method: "POST",
            credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
            // optional delay for smoothness
            setTimeout(() => {
                navigate("/");
            }, 800); // 0.8 seconds
        } else {
            console.error("Logout failed:", data.message);
            setLoading(false);
        }
    };

    return (
        <button className="sidebar-item" onClick={handleLogout} disabled={loading}>
            <span className="icon">
                {loading ? (
                    <div className="animate-spin w-4 h-4 border-2 border-t-transparent border-white rounded-full" />
                ) : (
                    <FiLogOut />
                )}
            </span>
            <span className="label">{loading ? "Signing out..." : "Sign out"}</span>
        </button>
    );
}
