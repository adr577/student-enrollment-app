import { useEffect, useState,  } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import { IoArrowBack } from "react-icons/io5";


export default function TeacherCourseDetail() {
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
            for (const studentId in editedGrades) {
                const grade = editedGrades[studentId];
                await api.post(`/update-grade/${classId}/${studentId}`, { grade });
            }
            setSuccessMsg("Grades saved successfully.");
            setTimeout(() => setSuccessMsg(""), 3000);
            setEditedGrades({});
        } catch (err) {
            console.error("Failed to update grades:", err);
            setError("Failed to save grades.");
        }
    }

    const handleGradeUpdate = async (studentId, grade) => {
        try {
            await api.post(`/update-grade/${classId}/${studentId}`, { grade });
        } catch (err) {
            console.error(err);
            setError("Failed to update grade.");
        }
    };

    return (
        <section className="min-h-screen p-10 bg-white text-black">

            <span className="p-2 cursor-pointer inline-block" onClick={() => navigate("/teacher")}>
                <IoArrowBack size={24} />
            </span>
            <h2 className="text-2xl font-bold mb-6">{courseName}</h2>
            <h3 className="text-lg mb-4">Enrolled Students</h3>

            {students.length > 0 ? (
                <ul className="space-y-4">
                    {students.map((student) => (
                        <li key={student.id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                            <span>{student.username}</span>
                            
                            <input
                                defaultValue={student.grade || ""}
                                onChange={(e) =>
                                    setEditedGrades(prev => ({ ...prev, [student.id]: e.target.value }))
                                }
                                value={editedGrades[student.id] ?? student.grade ?? ""}
                                className="border px-2 py-1 rounded text-black w-[70px]"
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No students enrolled in this course.</p>
            )}

            {Object.keys(editedGrades).length > 0 && (
                <button
                    onClick={handleSaveGrades}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Save Grades
                </button>
            )}

            {successMsg && <p className="text-green-600 mt-4">{successMsg}</p>}

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </section>
    );
}
