import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Loading Screen Component
const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full border-t-4 border-green-500 border-solid h-12 w-12 mx-auto"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading, please wait...</p>
      </div>
    </div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(() => {
    return sessionStorage.getItem("homeLoaded") ? false : true;
  });

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("homeLoaded", "true"); // Store load state
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        <section className="bg-white shadow-md rounded-xl max-w-[78rem] w-full mx-auto p-6 md:p-16 flex flex-col md:flex-row items-center justify-between mt-4 md:mt-10 relative overflow-hidden">
          
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
              <button className="mt-4 md:mt-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform duration-200 hover:shadow-sm hover:scale-105 active:scale-100">
                Go to Dashboard
              </button>
            </Link>
          </div>

          {/* Right Image (Optimized) */}
          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
            <picture>
              <source srcSet="/images/plant-small.webp" media="(max-width: 640px)" />
              <source srcSet="/images/plant-medium.webp" media="(max-width: 1024px)" />
              <img 
                src="/images/plant-large.webp" 
                alt="Plant" 
                loading="lazy" 
                fetchpriority="high" 
                width="600" 
                height="400" 
                decoding="async"
                className="max-w-full h-auto"
              />
            </picture>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
