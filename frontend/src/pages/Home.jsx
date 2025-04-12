export default function Home() {
    return (
        <section className="home-container">
            <h1 className="home-title">Welcome!</h1>
            <p className="home-subtitle">
                Welcome to <strong>ClassHive</strong>. Are you a student or teacher?
            </p>

            <div className="button-group">
                <button className="btn btn-outline">Student</button>
                <button className="btn btn-filled">Teacher</button>
            </div>
        </section>
    )
}
