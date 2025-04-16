import { Link } from "react-router-dom";
import homeImg from "../assets/homeImg.png";
import { GiTreeBeehive } from "react-icons/gi";

export default function Home() {
    return (
        <section
            className="flex-col min-h-screen flex justify-center items-center p-[2rem] bg-cover bg-no-repeat bg-center "
            style={{ backgroundImage: `url(${homeImg})` }}
        >
            <GiTreeBeehive size={100} color="#d1be17" />
            <p className="home-title">
                Welcome to <strong>ClassHive</strong>.
            </p>
            <p className="home-subtitle">Sign in as:</p>

            <div className="button-group">
                <Link to="/login/student">
                    <button className="btn btn-outline">Student</button>
                </Link>
                <Link to="/login/teacher">
                    <button className="btn btn-filled">Teacher</button>
                </Link>
                {/* redirect to flask-admin*/}
                <a href="http://localhost:5430/admin">
                    <button className="btn btn-outline">Admin</button>
                </a>
            </div>
        </section>
    );
}
