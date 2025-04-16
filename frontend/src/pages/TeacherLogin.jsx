import Login from "../components/Login";
import teacherImg from "../assets/teacherImage.png";
import BackHome from "../components/Back";
export default function TeacherLogin() {
    return (
        <section className="flex min-h-screen bg-[#0f0f0f]">
            {/* Left half with full-size image */}
            

            {/* Right half with login form */}
            <div className="w-1/2 flex items-center flex-col justify-center bg-[#fff] rounded-r-[2rem] shadow-lg">
                <BackHome />
                <Login role="Teacher" />
            </div>

            <div className="w-1/2 bg-[#e5e5e5] h-screen">
                <img
                    src={teacherImg}
                    alt="bee hive outline picture"
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    );
}
