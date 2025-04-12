import Login from "../components/Login"
import studentImg from "../assets/student.png"


export default function StudentLogin() {
    return (
        <section className="flex min-h-screen bg-[#e5e5e5]">
            <div className="w-2xl bg-[#e5e5e5] flex items-center justify-center text-[1.5rem]">
                <img width={400} src={studentImg} alt="a picture of a student" />
            </div>

            <div className="rounded-4xl flex-1 flex items-center justify-center bg-white ">
                <Login role="Student" />
            </div>
        </section>
    )
}
