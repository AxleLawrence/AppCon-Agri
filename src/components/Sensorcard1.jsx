export default function SensorCard({ label, value, icon: Icon, unit, bg }) {
  return (
    <div className="relative p-5 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-transform transform hover:scale-105">
      {/* Decorative Background Circle */}
      <div className={`absolute top-0 right-0 -mt-3 -mr-3 p-6 rounded-full ${bg} opacity-20`} />

      {/* Content */}
      <div className="flex items-center space-x-4 relative z-10">
        {/* Icon */}
        <div className={`p-3 rounded-lg ${bg} text-white shadow-md`}>
          <Icon className="w-7 h-7" />
        </div>

        {/* Text */}
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">
            {value}
            <span className="text-sm text-gray-500 ml-1">{unit}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
