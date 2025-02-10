import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* Left Side (Desktop Image) */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src="/images/farm.jpg"
          alt="Farm"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side (Login Form) */}
      <div className="relative w-full md:w-1/2 h-full flex items-center justify-center px-6 md:px-10">
        {/* Mobile Background */}
        <div className="absolute inset-0 md:hidden">
          <img
            src="/images/farm.jpg"
            alt="Farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Login Card */}
        <div className="relative bg-white p-8 rounded-3xl shadow-lg w-11/12 max-w-md">
          <h1 className="text-3xl font-bold text-center">Welcome</h1>
          <p className="text-gray-600 text-center mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <form className="mt-6">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg mb-3"
              placeholder="Email"
            />

            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg mb-6"
              placeholder="Password"
            />

            <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-gray-600 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-500 font-semibold hover:underline">
              Sign up here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
