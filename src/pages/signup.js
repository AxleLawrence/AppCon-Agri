import { Link } from "react-router-dom";
import facebookIcon from "../assets/icons/facebook2.svg";
import googleIcon from "../assets/icons/google.png";
function Signup() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left Side (Desktop Image) */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src="/images/farm.jpg"
          alt="Farm"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side (Signup Form) */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center px-6 md:px-10 py-10 overflow-y-auto md:overflow-hidden">
        {/* Mobile Background */}
        <div className="absolute inset-0 md:hidden">
          <img
            src="/images/farm.jpg"
            alt="Farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Signup Card */}
        <div className="relative bg-white p-6 md:p-8 rounded-3xl shadow-lg w-11/12 max-w-md">
          <h1 className="text-3xl font-bold text-center">Create an Account</h1>
          <p className="text-gray-600 text-center mt-2">
            Join us and start your journey!
          </p>

          {/* Signup Form */}
          <form className="mt-4 w-full">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg mb-3"
              placeholder="John Doe"
            />

            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg mb-3"
              placeholder="Email"
            />

            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg mb-3"
              placeholder="Password"
            />

            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg mb-6"
              placeholder="Confirm Password"
            />

            <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
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

          {/* Minimal Social Login Buttons */}
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
