export default function EnrollCard({ cls, onEnroll, onUnenroll, isEnrolled, mode }) {
    const isFull = cls.students_enrolled >= cls.max_students;
    const isDark = mode === "dark";

    return (
        <div className={`p-6 w-[21rem] max-h-[16rem] rounded-2xl shadow-md transition-all duration-300
            ${isDark ? "bg-[#272727] text-white" : "bg-[#fdfdfd] text-[#0f0f0f]"}`}>

            <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-rose-500 to-pink-400 text-transparent bg-clip-text">
                {cls.name}
            </h2>

            <div className="text-base mb-4 space-y-1.5 leading-relaxed">
                <p>
                    <span className="font-semibold">Time:</span>{" "}
                    <span className="font-normal">{cls.time}</span>
                </p>
                <p>
                    <span className="font-semibold">Instructor:</span>{" "}
                    <span className="font-normal">{cls.teacher}</span>
                </p>
                <p>
                    <span className="font-semibold">Enrolled:</span>{" "}
                    <span className="font-normal">{cls.students_enrolled}/{cls.max_students}</span>
                </p>
            </div>

            <div className="mt-6 flex gap-3">
                {!isEnrolled ? (
                    <button
                        onClick={() => !isFull && onEnroll(cls.id)}
                        disabled={isFull}
                        className={` py-2 px-4 text-sm font-medium rounded-full transition
                            ${isFull
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                    >
                        {isFull ? "Full" : "Enroll"}
                    </button>
                ) : (
                    <button
                        onClick={() => onUnenroll(cls.id)}
                        className=" py-2 px-4 text-sm font-medium rounded-full bg-red-500 hover:bg-red-600 text-white transition"
                    >
                        Unenroll
                    </button>
                )}
            </div>
        </div>
    );
}
