import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import WeatherCard from "../components/WeatherCard";
import FieldMap from "../components/FieldMap";
import CropDetails from "../components/CropDetails";
import TaskCalendar from "../components/TaskCalendar";
import ProfileDropdown from "../components/ProfileDropdown"; // ✅ Import ProfileDropdown

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen"
    >
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed inset-y-0 left-0 z-50 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`} // Sidebar will slide in/out on mobile
      >
        <Sidebar />
      </motion.div>

      {/* Main Content */}
      <div
        className={`flex-1 p-4 sm:p-6 transition-all ${
          isSidebarOpen ? "ml-48" : "ml-16" // Adjust left margin based on sidebar state
        }`}
      >
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 left-4 text-white md:hidden z-50"
        >
          
        </button>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Your Agricultural Assistant</h1>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            {/* Search Box (Hidden on Mobile) */}
            <div className="relative w-full sm:w-56 hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white px-4 py-2 rounded-lg shadow-md outline-none w-full"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-500" />
            </div>

            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>
        </div>

        {/* Weather and Soil Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          <WeatherCard title="Air Temp" value="24°C" color="blue" />
          <WeatherCard title="Soil Moisture" value="72%" color="green" />
          <WeatherCard title="Precipitation" value="-2mm" color="yellow" />
        </div>

        {/* Field Map and Crop Details Side by Side */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Live Cam (Field Map) */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1"
          >
            <FieldMap />
          </motion.div>

          {/* Crop Details */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:max-w-md"
          >
            <CropDetails />
          </motion.div>
        </div>

        {/* Task & Schedule Manager */}
        <div className="mt-6">
          <TaskCalendar />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;