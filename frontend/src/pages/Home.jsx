import { Link } from "react-router-dom";


export default function Home() {
    return (
        <section className="home-container min-h-screen">
            <h1 className="home-title">Welcome!</h1>
            <p className="home-subtitle">
                Welcome to <strong>ClassHive</strong>. Are you a student or teacher?
            </p>

            <div className="button-group">
                <Link to="/login/student">
                    <button className="btn btn-outline">Student</button>
                </Link>
                <Link to="/login/teacher">
                    <button className="btn btn-filled">Teacher</button>
                </Link>
            </div>
        </section>
    )
}
