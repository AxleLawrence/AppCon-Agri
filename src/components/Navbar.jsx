import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown"; // Import your ProfileDropdown

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white p-4 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="text-green-600 text-2xl font-bold pl-5">
          Agriculture
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-800 text-lg gap-10 pr-10">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink></li>
          <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Services</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink></li>
        </ul>

        {/* Profile Dropdown Component */}
        <ProfileDropdown />

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-black text-3xl md:hidden">
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-white text-black text-lg p-4 space-y-3 z-40">
          <NavLink to="/" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/dashboard" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/services" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Services</NavLink>
          <NavLink to="/contact" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
