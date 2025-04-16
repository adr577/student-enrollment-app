import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function BackHome({ className = "" }) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/")}
            className={`cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-black transition ${className}`}
        >
            <IoMdArrowBack size={20} />
            Back to Home
        </button>
    );
}
