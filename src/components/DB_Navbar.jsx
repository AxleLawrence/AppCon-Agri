import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // React Router Navigation

  return (
    <div className="relative bg-white shadow-md p-4 flex items-center">
      {/* Title - Centered */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-xl font-bold text-green-700">Agricultural Assistant</h1>
      </div>

      {/* Profile Section - Stays on the Right */}
      <div className="ml-auto relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg shadow-sm hover:bg-gray-200 transition"
        >
          <User className="w-5 h-5 text-gray-700" />
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {/* Profile Popup */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/profile')}>
                <User className="w-4 h-4 inline-block mr-2" /> Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/settings')}>
                <Settings className="w-4 h-4 inline-block mr-2" /> Settings
              </li>
              <li className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600" onClick={() => navigate('/login')}>
                <LogOut className="w-4 h-4 inline-block mr-2" /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
