import Login from "../components/Login"

export default function StudentLogin() {
    return (
        <section className="flex min-h-screen bg-[#e5e5e5]">
            <div className="w-2xl bg-[#e5e5e5] flex items-center justify-center text-[1.5rem]">
                <h2>Logo</h2>
            </div>

            <div className="rounded-4xl flex-1 flex items-center justify-center bg-white ">
                <Login role="Student" />
            </div>
        </section>
    )
}
