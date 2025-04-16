import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { IoArrowBack } from "react-icons/io5";

export default function TeacherCourseDetail({ mode }) {
    const navigate = useNavigate();
    const { classId } = useParams();
    const [students, setStudents] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [error, setError] = useState("");
    const [editedGrades, setEditedGrades] = useState({});
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        fetchCourseDetails();
    }, []);

    const fetchCourseDetails = async () => {
        try {
            const courseRes = await api.get("/get-classes/");
            const matched = courseRes.data.classes.find(cls => cls.id === classId);
            if (matched) setCourseName(matched.name);

            const res = await api.get(`/get-enrolled-students/${classId}`);
            setStudents(res.data.students);
        } catch (err) {
            console.error(err);
            setError("Failed to load student list.");
        }
    };

    const handleSaveGrades = async () => {
        try {
            const updatedStudents = [...students];
            for (const studentId in editedGrades) {
                const grade = editedGrades[studentId];
                await api.post(`/update-grade/${classId}/${studentId}`, { grade });

                const i = updatedStudents.findIndex(s => s.id === studentId);
                if (i !== -1) updatedStudents[i].grade = grade;
            }

            setStudents(updatedStudents);
            setSuccessMsg("Grades saved successfully.");
            setTimeout(() => setSuccessMsg(""), 3000);
            setEditedGrades({});
        } catch (err) {
            console.error("Failed to update grades:", err);
            setError("Failed to save grades.");
        }
    };

    return (
        <section className={`min-h-screen p-6 sm:p-10 transition-colors duration-300 ${mode === "dark" ? "bg-[#1a1a1a] text-white" : "bg-[#f9f9f9] text-[#0f0f0f]"}`}>
            <div className="mb-6">
                <span className="cursor-pointer inline-flex items-center gap-2 text-sm hover:text-gray-400" onClick={() => navigate("/teacher")}>
                    <IoArrowBack size={20} />
                    Back to Dashboard
                </span>
            </div>

            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">{courseName}</h2>
            <h3 className="text-xl font-medium mb-6">Enrolled Students</h3>

            {students.length > 0 ? (
                <ul className="space-y-4">
                    {students.map((student) => (
                        <li key={student.id} className={`flex justify-between items-center px-6 py-4 rounded-lg shadow-md ${mode === "dark" ? "bg-[#2a2a2a]" : "bg-white"}`}>
                            <span className="text-lg font-medium">{student.username}</span>
                            <div className="flex flex-col items-end">
                                <label htmlFor="grade" className="text-xs mb-1 opacity-70">Grade</label>
                                <input
                                    type="text"
                                
                                    value={editedGrades[student.id] ?? student.grade ?? ""}
                                    onChange={(e) => setEditedGrades(prev => ({ ...prev, [student.id]: e.target.value }))}
                                    className={`w-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${mode === "dark" ? "text-white bg-[#2a2a2a]" : "text-black"
                                        }`}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400">No students enrolled in this course.</p>
            )}

            {Object.keys(editedGrades).length > 0 && (
                <button
                    onClick={handleSaveGrades}
                    className={` ${mode === "dark" ?  "bg-[#f9f9f9] text-black" : "bg-black text-white"} mt-8  px-6 py-3 rounded-full font-medium  transition`}
                >
                    Save Grades
                </button>
            )}

            {successMsg && <p className="text-green-500 mt-4">{successMsg}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </section>
    );
}
