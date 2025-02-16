import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token); // Save token
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* Left Side (Desktop Image) */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img src="/images/farm.jpg" alt="Farm" className="w-full h-full object-cover" />
      </div>

      {/* Right Side (Login Form) */}
      <div className="relative w-full md:w-1/2 h-full flex items-center justify-center px-6 md:px-10">
        {/* Mobile Background */}
        <div className="absolute inset-0 md:hidden">
          <img src="/images/farm.jpg" alt="Farm" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Login Card */}
        <div className="relative bg-white p-8 rounded-3xl shadow-lg w-11/12 max-w-md">
          <h1 className="text-3xl font-bold text-center">Welcome</h1>
          <p className="text-gray-600 text-center mt-2">
            Log in to access your account.
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form className="mt-6" onSubmit={handleSubmit}>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-3"
              placeholder="Email"
              required
            />

            <div className="relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-6"
              placeholder="Password"
              required
            />
              <button
                type="button"
                className="absolute top-[40px] right-4 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}  
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

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
