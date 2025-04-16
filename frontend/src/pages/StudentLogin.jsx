import Login from "../components/Login"
import studentImg from "../assets/studentImage.png"
import BackHome from "../components/Back";

export default function StudentLogin() {
    return (
        <section className="flex min-h-screen overflow-hidden bg-[#0f0f0f]">
            
            {/* Left side with full image */}
            <div className="w-1/2 h-screen">
                <img
                    src={studentImg}
                    alt="picture of a bee outline"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right side with rounded left corners */}
            <div className="w-1/2 bg-white flex items-center justify-center flex-col rounded-l-[2rem] shadow-lg">
                <BackHome />
                <Login role="Student" />
                <p className="text-sm mt-2">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-[#0f0f0f] font-bold underline hover:text-blue-800 transition">
                        Register here
                    </a>
                </p>
            </div>
        </section>
    );
}
