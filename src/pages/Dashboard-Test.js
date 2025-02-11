import { motion } from "framer-motion";
import Sidebar1 from "../components/Sidebar1";
import TaskCalendar1 from "../components/TaskCalendar1";
import SensorCard from "../components/Sensorcard1";
import LiveCam1 from "../components/LiveCam1";
import CropDetails1 from "../components/CropDetails1";
import { Thermometer, Droplets, CloudRain } from "lucide-react";

export default function Database1() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar1 />
      <main className="flex-1 p-4 space-y-6">
        {/* Sensor Cards */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SensorCard label="Air Temp" value="24" unit="°C" bg="bg-blue-500" icon={Thermometer} />
          <SensorCard label="Soil Moisture" value="72" unit="%" bg="bg-green-500" icon={Droplets} />
          <SensorCard label="Precipitation" value="-2" unit="mm" bg="bg-yellow-500" icon={CloudRain} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <LiveCam1 />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          <CropDetails1 />
        </motion.div>
      </main>
    </div>
  );
}
