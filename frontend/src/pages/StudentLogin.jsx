import Login from "../components/Login"
import studentImg from "../assets/studentImage.png"
import { IoMdArrowBack } from "react-icons/io";


export default function StudentLogin() {
    return (
        <section className="flex min-h-screen overflow-hidden bg-[#fdfcf5]">
            {/* Left side with full image */}
            <div className="w-1/2 h-screen">
                <img
                    src={studentImg}
                    alt="a picture of a student"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right side with rounded left corners */}
            <div className="w-1/2 bg-white flex items-center justify-center flex-col rounded-l-[2rem] shadow-lg">
                <Login role="Student" />
            </div>
        </section>
    );
}
