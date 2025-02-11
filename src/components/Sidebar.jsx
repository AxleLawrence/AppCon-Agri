import { useState } from "react";
import { Link } from "react-router-dom";
import { IoHome, IoLeaf, IoSettings, IoMenu } from "react-icons/io5";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
  className={`bg-black text-white fixed inset-y-0 left-0 flex flex-col items-center py-6 transition-all duration-300 ease-in-out z-50 ${
    isOpen ? "w-48 shadow-lg" : "w-14"
  }`}
  onMouseEnter={() => setIsOpen(true)}
  onMouseLeave={() => setIsOpen(false)}
>
      {/* Menu Button for Mobile */}
      <button
        className="absolute top-4 left-4 text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoMenu size={28} />
      </button>

      {/* Sidebar Content */}
      <div className="w-full flex flex-col items-center space-y-6 mt-12">
        {/* Logo */}
        <span className="text-4xl">🌿</span>

        {/* Navigation Links */}
        <nav className="w-full flex flex-col items-center space-y-6">
          <SidebarLink to="/" icon={<IoHome size={24} />} text="Home" isOpen={isOpen} />
          <SidebarLink to="/dashboard" icon={<IoLeaf size={24} />} text="Dashboard" isOpen={isOpen} />
          <SidebarLink to="/settings" icon={<IoSettings size={24} />} text="Settings" isOpen={isOpen} />
        </nav>
      </div>
    </aside>
  );
};

const SidebarLink = ({ to, icon, text, isOpen }) => (
  <Link
    to={to}
    className="flex items-center w-full space-x-3 px-4 py-2 hover:bg-gray-800 rounded-md transition-all"
  >
    {icon}
    {isOpen && <span className="text-sm">{text}</span>}
  </Link>
);

export default Sidebar;
