import { Link } from "react-router-dom";
import facebookIcon from "../assets/icons/facebook2.svg";
import googleIcon from "../assets/icons/google.png";

function Signup() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
    {/* Left Side (Desktop Image) */}
    <div className="hidden md:flex md:w-1/2">
      <img
        src="/images/farm.jpg"
        alt="Farm"
        className="w-full h-full object-cover"
      />
    </div>


      {/* Right Side (Signup Form) */}
      <div className="relative flex items-center justify-center w-full md:w-1/2 px-6 md:px-12 py-12">
        {/* Mobile Background */}
        <div className="absolute inset-0 md:hidden z-[-1]">
          <img
            src="/images/farm.jpg"
            alt="Farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Signup Card */}
        <div className="relative bg-white p-6 md:p-10 rounded-xl shadow-lg w-full max-w-md overflow-hidden">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Create an Account
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Join us and start your journey!
          </p>

          {/* Signup Form */}
          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Password"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Confirm Password"
              />
            </div>

            <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <p className="text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500 font-semibold hover:underline">
              Log in here.
            </Link>
          </p>

          {/* Social Login Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <button className="flex items-center justify-center w-full border p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">
              <img src={facebookIcon} alt="Facebook" className="w-5 h-5 mr-2" />
              Continue with Facebook
            </button>

            <button className="flex items-center justify-center w-full border p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">
              <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
