import { useState, useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ number: "", password: "", rememberMe: false });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Load saved credentials if "Remember Me" was checked
  useEffect(() => {
    const savedNumber = localStorage.getItem("rememberedNumber");
    if (savedNumber) {
      setFormData((prev) => ({ ...prev, number: savedNumber, rememberMe: true }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log("Attempting login with:", formData);

    if (!formData.number || !formData.password) {
      setError("Phone number and password are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: formData.number, password: formData.password }),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);

        if (formData.rememberMe) {
          localStorage.setItem("rememberedNumber", formData.number);
        } else {
          localStorage.removeItem("rememberedNumber");
        }

        navigate("/dashboard");
      } else {
        setError(data.error || "Invalid login");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Server error.");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img src="/images/farm.jpg" alt="Farm" className="w-full h-full object-cover" />
      </div>

      {/* Right Side */}
      <div className="relative w-full md:w-1/2 h-full flex items-center justify-center px-6 md:px-10">
        <div className="absolute inset-0 md:hidden">
          <img src="/images/farm.jpg" alt="Farm" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        <div className="relative bg-white p-8 rounded-3xl shadow-lg w-11/12 max-w-md">
          <h1 className="text-3xl font-bold text-center">Welcome</h1>
          <p className="text-gray-600 text-center mt-2">Log in to access your account.</p>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form className="mt-6" onSubmit={handleSubmit}>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-3"
              placeholder="Phone Number"
              required
            />

            <div className="relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mb-3"
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

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-gray-700">Remember Me</label>
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
