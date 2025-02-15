import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, CloudRain } from "lucide-react";

// Lazy load components to reduce unused JavaScript
const Sidebar1 = lazy(() => import("../components/Sidebar1"));
const SensorCard = lazy(() => import("../components/Sensorcard1"));
const LiveCam1 = lazy(() => import("../components/LiveCam1"));
const CropDetails1 = lazy(() => import("../components/CropDetails1"));

export default function Database1() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with Lazy Loading */}
      <Suspense fallback={<div className="p-4">Loading Sidebar...</div>}>
        <Sidebar1 />
      </Suspense>

      <main className="flex-1 p-4 space-y-6">
        {/* Sensor Cards Animation */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <SensorCard label="Air Temp" value="24" unit="°C" bg="bg-blue-500" icon={Thermometer} />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <SensorCard label="Soil Moisture" value="72" unit="%" bg="bg-green-500" icon={Droplets} />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <SensorCard label="Precipitation" value="-2" unit="mm" bg="bg-yellow-500" icon={CloudRain} />
          </motion.div>
        </motion.div>

        {/* Live Camera with Lazy Loading & Animation */}
        <Suspense fallback={<div className="p-4">Loading Live Camera...</div>}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <LiveCam1 />
          </motion.div>
        </Suspense>

        {/* Crop Details with Lazy Loading & Animation */}
        <Suspense fallback={<div className="p-4">Loading Crop Details...</div>}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <CropDetails1 />
          </motion.div>
        </Suspense>
      </main>
    </div>
  );
}
