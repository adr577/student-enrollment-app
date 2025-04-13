import { Link } from "react-router-dom";


export default function Home() {
    return (
        <section className="home-container min-h-screen">
            <h1 className="home-title">Welcome!</h1>
            <p className="home-subtitle">
                Welcome to <strong>ClassHive</strong>.
            </p>
            <p className="home-subtitle">
                Sign in as:
            </p>

            <div className="button-group">
                <Link to="/login/student">
                    <button className="btn btn-outline">Student</button>
                </Link>
                <Link to="/login/teacher">
                    <button className="btn btn-filled">Teacher</button>
                </Link>
                {/* redirect to flask-admin*/}
                <a href="http://localhost:5000/admin">
                    <button className="btn btn-outline">Admin</button>
                </a>
            </div>
        </section>
    )
}
