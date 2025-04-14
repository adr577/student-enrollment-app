import Login from "../components/Login";
import teacherImg from "../assets/teacherImage.png";

export default function TeacherLogin() {
    return (
        <section className="flex min-h-screen">
            {/* Left half with full-size image */}
            

            {/* Right half with login form */}
            <div className="w-1/2 rounded-4xl flex items-center justify-center bg-white rounded-r-[2rem] shadow-lg">
                <Login role="Teacher" />
            </div>

            <div className="w-1/2 bg-[#e5e5e5] h-screen">
                <img
                    src={teacherImg}
                    alt="a picture of a teacher"
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    );
}
