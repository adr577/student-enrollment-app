import Login from "../components/Login"
import teacherImg from "../assets/teacher.png"

export default function TeacherLogin() {
    return (
        <section className="flex min-h-screen bg-[#e5e5e5]">
            <div className="w-2xl flex items-center justify-center text-[1.5rem]">
                <img width={350} src={teacherImg} alt="a picture of a teacher" />
            </div>
            <div className="rounded-4xl flex-1 flex items-center justify-center bg-white ">
                <Login role="Teacher"/>
            </div> 
        </section>
    )
}
