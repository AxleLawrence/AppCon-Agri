import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    fullname: "",
    password: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Basic Frontend Validation
    if (!/^\d{11}$/.test(formData.number)) {
      return setError("Mobile number must be 11 digits.");
    }
    if (formData.fullname.trim().length < 3 || formData.fullname.trim().length > 100) {
      return setError("Full name must be between 3-100 characters.");
    }    
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }
    if (!/^\d{6}$/.test(formData.otp)) {
      return setError("OTP must be 6 digits.");
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", formData);
      setSuccess(response.data.message);

      // Redirect to login after successful signup
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-700">Sign Up</h1>
        <p className="text-gray-600 text-center mb-4">Monitor your plants efficiently</p>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Mobile Number</label>
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your number"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg pr-10"
              placeholder="Create a password"
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

          <div className="relative">
            <label className="block text-gray-700 font-medium">OTP Verification</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg pr-10"
              placeholder="Enter OTP sent to your phone"
              required
            />         
          </div>

          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
            Sign Up
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 font-semibold hover:underline">
            Log in here.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
