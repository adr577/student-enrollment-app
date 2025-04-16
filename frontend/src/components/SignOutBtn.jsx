import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function SignOut() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await fetch("http://localhost:5430/api/logout", {
            method: "POST",
            credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
            navigate("/");
        } else {
            console.error("Logout failed:", data.message);
        }
    };
    return (
        <button className="sidebar-item" onClick={handleLogout}>
            <span className="icon">
                <FiLogOut />
            </span>
            <span className="label">Sign out</span>
        </button>
    );
}
