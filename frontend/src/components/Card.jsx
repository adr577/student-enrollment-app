import { Link } from "react-router-dom";

export default function Card({ cls, mode, role }) {
    const containerStyles = `p-6 w-[20rem] max-h-[10rem] rounded-xl shadow-md transition-all duration-200 ${mode === "light" ? "bg-[#fdfdfdf] text-[#0f0f0f]" : "bg-[#121212] text-white"
        }`;

    const labelClass = "font-semibold";
    const valueClass = "font-normal";

    return (
        <div className={containerStyles}>
            {role === "teacher" ? (
                <Link
                    to={`/teacher/course/${cls.id}`}
                    className="group flex items-center gap-2 mb-4 text-2xl font-bold transition duration-200"
                    title="View course details"
                >
                    <span className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-500 group-hover:after:w-full after:transition-all after:duration-300">
                        {cls.name}
                    </span>
                    <span className="opacity-80 group-hover:opacity-100 transition duration-200 text-blue-300">
                        →
                    </span>
                </Link>



            ) : (
                    <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-rose-500 to-pink-400 text-transparent bg-clip-text">
                        {cls.name}
                    </h2>

            )}

            <div className="space-y-1 text-base leading-relaxed">
                <p>
                    <span className={labelClass}>Time:</span>{" "}
                    <span className={valueClass}>{cls.time}</span>
                </p>
                <p>
                    <span className={labelClass}>Enrolled:</span>{" "}
                    <span className={valueClass}>
                        {cls.students_enrolled}/{cls.max_students}
                    </span>
                </p>
            </div>
        </div>
    );
}
