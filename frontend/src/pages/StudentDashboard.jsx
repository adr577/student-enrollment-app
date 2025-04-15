import { useEffect, useState } from "react";
import { MdBookmarkAdd, MdOutlineBookmarkAdded } from "react-icons/md";
import ModeToggle from "../components/Mode";
import Card from "../components/Card";
import EnrollCard from "../components/EnrollCard";
import SignOut from "../components/SignOutBtn";
import api from "../utils/api"; // axios instance

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState("myCourses");
    const [currentMode, setCurrentMode] = useState("light");
    const [myClasses, setMyClasses] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [error, setError] = useState("");

    const toggleMode = () => {
        setCurrentMode(prev => (prev === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const [myRes, allRes] = await Promise.all([
                api.get("/get-classes/"),   // enrolled
                api.get("/get-classes"),    // all
            ]);

            setMyClasses(myRes.data.classes);
            setAllClasses(allRes.data.classes); // don't filter here
        } catch (err) {
            console.error(err);
            setError("Error fetching classes.");
        }
    }

    async function handleEnroll(classId) {
        try {
            await api.post(`/enroll/${classId}`);
            fetchData();
        } catch (err) {
            console.error("Enroll error:", err);
            setError("Failed to enroll.");
        }
    }

    async function handleUnenroll(classId) {
        try {
            await api.post(`/unenroll/${classId}`);
            fetchData();
        } catch (err) {
            console.error("Unenroll error:", err);
            setError("Failed to unenroll.");
        }
    }

    return (
        <section className="flex min-h-screen text-white">
            <aside className="w-1/5 bg-[#0f0f0f] flex flex-col justify-between py-6 px-4 shadow-lg">
                <nav>
                    <h2 className="text-[2rem] font-semibold mb-6">Dashboard</h2>
                    <ul className="sidebar-nav">
                        <li
                            className={`sidebar-item ${activeTab === "myCourses" ? "active" : ""}`}
                            onClick={() => setActiveTab("myCourses")}
                        >
                            <span className="icon"><MdOutlineBookmarkAdded /></span>
                            <span className="label">My Courses</span>
                        </li>
                        <li
                            className={`sidebar-item ${activeTab === "addCourses" ? "active" : ""}`}
                            onClick={() => setActiveTab("addCourses")}
                        >
                            <span className="icon"><MdBookmarkAdd /></span>
                            <span className="label">Add Courses</span>
                        </li>
                    </ul>
                </nav>
                <SignOut />
            </aside>

            <main className={`flex-1 transition-colors duration-300 ${currentMode === "light" ? "bg-white text-black" : "bg-[#131c29] text-white"}`}>
                <nav className={`relative w-full flex items-center justify-end p-8 mb-10 shadow-lg ${currentMode === "light" ? "bg-white" : "bg-[#0f0f0f] text-white"}`}>
                    <h3 className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold">
                        Welcome back, Student!
                    </h3>
                    <ModeToggle currentMode={currentMode} toggleMode={toggleMode} />
                </nav>

                <section className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {activeTab === "myCourses" ? (
                        myClasses.length > 0 ? (
                            myClasses.map((cls) => (
                                <Card key={cls.id} cls={cls} mode={currentMode} role="student" />
                            ))
                        ) : (
                            <p>No enrolled courses.</p>
                        )
                    ) : (
                        allClasses.length > 0 ? (
                            allClasses.map((cls) => {
                                const isEnrolled = myClasses.some((enrolled) => enrolled.id === cls.id);
                                return (
                                    <EnrollCard
                                        key={cls.id}
                                        cls={cls}
                                        isEnrolled={isEnrolled}
                                        onEnroll={handleEnroll}
                                        onUnenroll={handleUnenroll}
                                        mode={currentMode}
                                    />
                                );
                            })
                        ) : (
                            <p>No courses available.</p>
                        )
                    )}
                    {error && <p className="text-red-500 col-span-full">{error}</p>}
                </section>
            </main>
        </section>
    );
}
