import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import facebookIcon from "../assets/icons/facebook2.svg";
import googleIcon from "../assets/icons/google.png";

function Signup() {
  const navigate = useNavigate(); // Initialize navigation hook

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.fullname || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token); // Store JWT token in local storage
        setSuccess("Signup successful! Redirecting...");
        setError(null);

        // Redirect to login after 2 seconds
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.error || "Something went wrong");
        setSuccess(null);
      }
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/images/farm.jpg')" }}></div>

      <div className="relative flex items-center justify-center w-full md:w-1/2 px-6 md:px-12 py-12">
        <div className="relative bg-white p-6 md:p-10 rounded-xl shadow-lg w-full max-w-md overflow-hidden">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Create an Account
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Join us and start your journey!
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Full Name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Email"
                required
              />
            </div>

            {/* PASSWORD FIELD WITH TOGGLE */}
            <div className="relative">
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg pr-10"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute top-[40px] right-5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* CONFIRM PASSWORD FIELD WITH TOGGLE */}
            <div className="relative">
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg pr-10"
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                className="absolute top-[40px] right-5 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
              Sign Up
            </button>
          </form>

          <p className="text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500 font-semibold hover:underline">
              Log in here.
            </Link>
          </p>

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
