import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ModeToggle({ currentMode, toggleMode }) {
    return (
        <button
            onClick={toggleMode}
            className="text-xl p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            title="Toggle Mode"
        >
            {currentMode === "light" ? <MdDarkMode /> : <MdLightMode />}
        </button>
    );
}
