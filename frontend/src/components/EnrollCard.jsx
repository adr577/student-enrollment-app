export default function EnrollCard({ cls, onEnroll, onUnenroll, isEnrolled, mode }) {
    const isFull = cls.students_enrolled >= cls.max_students;

    return (
        <div className={`p-8 w-[20.6rem] h-[17.8rem] rounded-lg shadow-md ${mode === "light" ? "bg-stone-100 text-[#0f0f0f]" : "bg-[#24354e] text-white"
            }`}>
            <h2 className="text-lg font-bold">{cls.name}</h2>
            <p>Time: {cls.time}</p>
            <p>Teacher: {cls.teacher}</p>
            <p>{cls.students_enrolled}/{cls.max_students} enrolled</p>

            <div className="mt-10 flex gap-2">
                {!isEnrolled && (
                    <button
                        className={`px-4 py-1 rounded text-white ${isFull
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                        onClick={() => !isFull && onEnroll(cls.id)}
                        disabled={isFull}
                    >
                        {isFull ? "Full" : "Enroll"}
                    </button>
                )}

                {isEnrolled && (
                    <button
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                        onClick={() => onUnenroll(cls.id)}
                    >
                        Unenroll
                    </button>
                )}
            </div>
        </div>
    );
}
