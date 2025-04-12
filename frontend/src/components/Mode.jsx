// src/components/ModeToggle.jsx
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ModeToggle({ currentMode, toggleMode }) {
    return (
        <span className="text-2xl cursor-pointer select-none" onClick={toggleMode}>
            {currentMode === "light" ? <MdDarkMode /> : <MdLightMode />}
        </span>
    );
}
