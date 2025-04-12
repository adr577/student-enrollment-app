import { MdBookmarkAdd, MdOutlineBookmarkAdded, MdDarkMode, MdLightMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import Card from "../components/Card";
import ModeToggle from "../components/Mode";
import { useState } from "react";


export default function StudentDashboard() {

    const [activeTab, setActiveTab] = useState("myCourses");
    const [currentMode, setCurrentMode] = useState("light");
    const toggleMode = () => {
        setCurrentMode(prev => (prev === "light" ? "dark" : "light"));
    };


    return (
        <section className="flex min-h-screen text-white">
            <aside className="w-1/5 bg-[#0f0f0f] flex flex-col justify-between py-6 px-4 shadow-lg">
                

                <nav>
                    <h2 className="text-[2rem] font-semibold mb-6 ">Dashboard</h2>
                    <ul className="sidebar-nav">
                        <li className={`sidebar-item ${activeTab === "myCourses" ? "active" : ""}`}
                            onClick={() => setActiveTab("myCourses")}
                        >
                            <span className="icon"><MdOutlineBookmarkAdded /></span>
                            <span className="label">My Courses</span>
                        </li>
                        <li className={`sidebar-item ${activeTab === "addCourses" ? "active" : ""}`}
                            onClick={() => setActiveTab("addCourses")}
                        >
                            <span className="icon"><MdBookmarkAdd /></span>
                            <span className="label">Add Courses</span>
                        </li>
                    </ul>
                </nav>

                <div className="sidebar-item">
                    <span className="icon"><FiLogOut /></span>
                    <span className="label">Sign out</span>
                </div>

            </aside>

            <main className={`flex-1 transition-colors duration-300 
    ${currentMode === "light" ? "bg-white text-black" : "bg-[#1f1f1f] text-white"}`}>
                <nav className={`relative w-full flex items-center justify-end p-8 mb-10 shadow-lg ${currentMode === "light" ? "bg-white" : "bg-[#0f0f0f] text-white"}`}>
                    <h3 className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold">
                        Welcome back, Mindy!
                    </h3>
                    
                    <ModeToggle currentMode={currentMode} toggleMode={toggleMode} />

                </nav>


                <section className="p-8">
                    {activeTab === "myCourses" ? (
                        <Card
                            mode={currentMode}
                        /> // replace with actual course list
                    ) : (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
                            {/* Add your course add logic here */}
                            <p>You can add courses here.</p>
                        </div>
                    )}
                </section>


                
            </main>


        </section>
    )
}
