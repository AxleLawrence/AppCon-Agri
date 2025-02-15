import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-green-600">404</h1>
      <p className="text-xl text-gray-700 mt-4">Page is still in Development</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
