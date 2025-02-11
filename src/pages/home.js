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
      {/* Main Content */}
      <main className="flex-grow">
        <section className="bg-white shadow-lg rounded-xl max-w-[78rem] w-full mx-auto p-8 md:p-20 flex flex-col md:flex-row items-center justify-between mt-2 md:mt-10 relative overflow-hidden animate-fade-in">
          
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-black font-serif leading-tight">
              Smart Plant Monitoring
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mt-2 font-serif">
              Grow healthier plants with real-time insights.
            </h2>
            <p className="text-gray-600 mt-3 md:mt-4 text-lg opacity-80">
              Track plant health with real-time analytics, optimize watering schedules, and enhance growth with smart AI-based monitoring.
            </p>
            <Link to="/dashboard">
              <button className="mt-4 md:mt-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Go to Dashboard
              </button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
            <img 
              src={plantIcon} 
              alt="Plant" 
              className="max-w-xs md:max-w-md transform transition-all duration-700 animate-plant-float w-full sm:w-3/4 md:w-auto" 
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
