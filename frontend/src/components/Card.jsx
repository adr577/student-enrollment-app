import { Link } from "react-router-dom";

export default function Card({ cls, mode, role }) {
    return (
        <div className={`p-8 w-[20.6rem] h-[17.8rem] rounded-lg shadow-md ${mode === "light" ? "bg-stone-100 text-[#0f0f0f]" : "bg-[#24354e] text-white"
            }`}>
            {
                role === "teacher" ? (
                    <Link to={`/teacher/course/${cls.id}`} className=" underline text-[1.4rem] font-bold block mb-4">
                        <h4>{cls.name}</h4>
                    </Link>
                ) : (
                    <h4 className="text-[1.4rem] mb-4 font-bold">{cls.name}</h4>
                )
            }
            <p className="mb-2">Time: {cls.time}</p>
            <p>Students enrolled: {cls.students_enrolled}/{cls.max_students}</p>
        </div>
    );
}
