import { MdBookmarkAdd, MdOutlineBookmarkAdded, MdDarkMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import Card from "../components/Card";

export default function StudentDashboard() {
    return (
        <section className="flex min-h-screen text-white">
            <aside className="w-1/5 bg-[#0f0f0f] flex flex-col justify-between py-6 px-4 shadow-lg">
                

                <nav>
                    <h2 className="text-[2rem] font-semibold mb-6 ">Dashboard</h2>
                    <ul className="sidebar-nav">
                        <li className="sidebar-item active">
                            <span className="icon"><MdOutlineBookmarkAdded /></span>
                            <span className="label">My Courses</span>
                        </li>
                        <li className="sidebar-item">
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

            <main className="flex-1 bg-white text-[#0f0f0f]">
                <nav className="relative w-full flex items-center justify-end p-8">
                    <h3 className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold">
                        Welcome back, Mindy!
                    </h3>
                    <span className="text-2xl cursor-pointer">
                        <MdDarkMode />
                    </span>
                </nav>

                <section className="ml-5">
                    <Card />
                </section>


                
            </main>


        </section>
    )
}
