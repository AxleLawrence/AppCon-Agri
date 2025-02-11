import { Home, LayoutDashboard, Briefcase, X, Menu, Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 bg-gray-600 hover:bg-gray-400 text-white p-3 rounded-full shadow-lg z-50 transition-all"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static mt-3 ml-1 top-0 left-2 h-[92vh] w-64 p-6 
        bg-[#222831] shadow-xl rounded-2xl transition-all duration-300 ease-in-out 
        flex flex-col justify-start z-40 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } md:opacity-100 md:pointer-events-auto`}
      >

        {/* Close Button (Mobile Only) */}
        <button
          className="md:hidden absolute top-4 right-4 text-white"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Sidebar Title */}
        <h1 className="text-xl font-bold text-center text-white tracking-wide">
          Dashboard
        </h1>

        {/* Navigation */}
        <nav className="mt-4 flex flex-col space-y-2">
          <NavItem to="/" label="Home" Icon={Home} />
          <NavItem to="/dashboard" label="Dashboard" Icon={LayoutDashboard} />
          <NavItem to="/calendar" label="Task Manager" Icon={Calendar} />
          <NavItem to="/services" label="Services" Icon={Briefcase} />
        </nav>
      </aside>
    </>
  );
}

// Nav Item Component
function NavItem({ to, label, Icon }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 bg-gray-200 hover:bg-green-200 text-black hover:text-black shadow-md"
    >
      <Icon className="w-6 h-6" />
      <span className="text-lg">{label}</span>
    </Link>
  );
}
