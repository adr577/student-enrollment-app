import { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { IoMdGlobe } from "react-icons/io";
import ModeToggle from "../components/Mode";
import SignOut from "../components/SignOutBtn";
import api from "../utils/api";
import Card from "../components/Card";

export default function TeacherDashboard(props) {
    const { currentMode, toggleMode } = props; // ✅ Fix here
    const [activeTab, setActiveTab] = useState("myCourses");
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");
    const username = localStorage.getItem("teacher_username") || "Instructor";

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "Good morning";
        if (hour >= 12 && hour < 17) return "Good afternoon";
        if (hour >= 17 && hour < 21) return "Good evening";
        return "Good night";
    };

    useEffect(() => {
        fetchTeacherCourses();
    }, []);

    const fetchTeacherCourses = async () => {
        try {
            const res = await api.get('/get-classes/');
            setCourses(res.data.classes);
        } catch (err) {
            console.error(err);
            setError("Failed to load courses.");
        }
    };

    return (
        <section className="min-h-screen bg-white text-black">
            <header className="bg-[#0f0f0f] text-white px-4 sm:px-6 md:px-10 py-6 md:py-10 md:pb-14 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <IoMdGlobe className="text-xl" />
                        <span className="font-semibold text-lg sm:text-xl">Acme University</span>
                    </div>
                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <ModeToggle currentMode={currentMode} toggleMode={toggleMode} />
                        <SignOut />
                    </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-medium mt-6">
                    {getGreeting()} {username}!
                </h2>
            </header>

            <div className={`px-4 sm:px-6 md:px-10 py-8 ${currentMode === "light" ? "bg-white text-[#0f0f0f]" : "bg-[#1a1a1a] text-white"}`}>
                <h3 className="text-lg font-semibold mb-4">Your Courses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-screen">
                    {courses.length > 0 ? (
                        courses.map((cls) => (
                            <Card key={cls.id} cls={cls} mode={currentMode} role="teacher" />
                        ))
                    ) : (
                        <p>No courses found.</p>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </section>
    );
}
