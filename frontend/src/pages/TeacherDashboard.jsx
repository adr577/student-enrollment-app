import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { IoMdGlobe } from "react-icons/io";
import ModeToggle from "../components/Mode"; // Make sure the filename is Mode.jsx

export default function TeacherDashboard() {
    const [activeTab, setActiveTab] = useState("myCourses");
    const [currentMode, setCurrentMode] = useState("light");

    const toggleMode = () => {
        setCurrentMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <section className="min-h-screen bg-white text-black">
            {/* Full Black Header Section */}
            <header className={`bg-[#0f0f0f] text-white px-4 sm:px-6 md:px-10 py-6 md:py-10 md:pb-14 shadow-lg`}>
                {/* Top Row */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <IoMdGlobe className="text-xl" />
                        <span className="font-semibold text-lg sm:text-xl">Acme University</span>
                    </div>
                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <ModeToggle currentMode={currentMode} toggleMode={toggleMode} />
                        <button className="flex items-center space-x-1 hover:underline">
                            <span className="text-sm sm:text-base">Sign out</span>
                            <FiLogOut className="text-lg" />
                        </button>
                    </div>
                </div>

                {/* Greeting */}
                <h2 className="text-xl sm:text-2xl font-medium mt-6">Good afternoon Hepworth!</h2>
            </header>

            {/* White Background Section Below */}
            <div className={`px-4 sm:px-6 md:px-10 py-8 ${currentMode === "light" ? "bg-white text-[#0f0f0f]" : "bg-[#1f1f1f] text-white"}`}>
                <h3 className="text-lg font-semibold mb-4">Your Courses</h3>

                {/* Placeholder for course cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Course cards will go here */}
                </div>
            </div>
        </section>
    );
}
