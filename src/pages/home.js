import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import facebookIcon from "../assets/icons/facebook2.svg";
import emailIcon from "../assets/icons/email2.svg";
import linkedinIcon from "../assets/icons/linkedin1.svg";
import leafIcon from "../assets/icons/leaf.png";
import plantIcon from "../assets/icons/plant.png";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get current route

  useEffect(() => {
    // Highlight active link based on current route
    const links = document.querySelectorAll(".nav-link, .mobile-nav-link");
    links.forEach(link => {
      if (link.getAttribute("href") === location.pathname) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }, [location]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-green-600 text-2xl font-bold pl-5">
            Agriculture
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-black text-3xl md:hidden">
            ☰
          </button>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-6 text-gray-800 text-lg gap-10 pr-10">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
            <li><Link to="/services" className="nav-link">Services</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col bg-white text-black text-lg p-4 space-y-3">
            <Link to="/" className="mobile-nav-link">Home</Link>
            <Link to="/dashboard" className="mobile-nav-link">Dashboard</Link>
            <Link to="/services" className="mobile-nav-link">Services</Link>
            <Link to="/contact" className="mobile-nav-link">Contact</Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <section className="bg-white shadow-lg rounded-xl max-w-[78rem] w-full mx-auto p-14 md:p-20 flex flex-col md:flex-row items-center justify-between mt-5 md:mt-10 relative overflow-hidden animate-fade-in">
          {/* Floating Leaf Images */}
          {[["top-0 left-0", "rotate-[130deg]"], ["top-0 right-0", "rotate-[220deg]"], ["bottom-0 left-0", "rotate-[45deg]"], ["bottom-0 right-0", "rotate-[-45deg]"]].map(([position, rotation], index) => (
            <img key={index} src={leafIcon} alt="Leaf"
              className={`absolute ${position} w-[40%] md:w-[30%] max-w-[200px] md:max-w-[300px] transform opacity-90 object-contain z-20 animate-float ${rotation}`} />
          ))}

          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-bold text-black font-serif leading-tight">Smart Plant Monitoring</h1>
            <h2 className="text-3xl font-bold text-green-600 mt-2 font-serif">
              Grow healthier plants with real-time insights.
            </h2>
            <p className="text-gray-600 mt-4 text-lg opacity-80">
              Track plant health with real-time analytics, optimize watering schedules, and enhance growth with smart AI-based monitoring.
            </p>
            <Link to="/dashboard">
              <button className="mt-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Go to Dashboard
              </button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img src={plantIcon} alt="Plant" className="max-w-xs md:max-w-md transform transition-all duration-700 animate-plant-float" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-600 text-white py-3 mt-10 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <h2 className="text-lg font-semibold">Smart Agriculture</h2>
            <p className="text-xs opacity-80 mt-1">Empowering farmers with smart monitoring & analytics.</p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-3 mt-3 md:mt-0">
            <a href="#" className="hover:opacity-80 transition">
              <img src={facebookIcon} alt="Facebook" className="w-4 h-4" />
            </a>
            <a href="#" className="hover:opacity-80 transition">
              <img src={emailIcon} alt="Email" className="w-4 h-4" />
            </a>
            <a href="#" className="hover:opacity-80 transition">
              <img src={linkedinIcon} alt="LinkedIn" className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs opacity-70 mt-2">
          © 2025 Smart Agriculture. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
