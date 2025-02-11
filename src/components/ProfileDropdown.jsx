import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token (if used)
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="relative">
      {/* Profile Icon */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center space-x-2"
      >
        <FaUserCircle className="text-3xl text-gray-700" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg">
          <button
            onClick={() => navigate("/profile")}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Profile
          </button>
          <hr />
          <button
            onClick={() => navigate("/profile")}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Settings
          </button>
          <hr />
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
