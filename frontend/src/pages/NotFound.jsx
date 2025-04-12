import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-white">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-lg text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
                Go back home
            </Link>
        </section>
    );
}
