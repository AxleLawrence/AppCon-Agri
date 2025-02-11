import { useState } from "react";

export default function CropDetails() {
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [showModal, setShowModal] = useState(false);

  const cropData = {
    wheat: {
      image: "/images/wheat.jpg",
      description:
        "Raw wheat can be ground into flour or semolina. It can also be germinated, crushed, or steamed to create different products.",
      nutrition: { fats: 10, proteins: 26, carbs: 34 },
      details: {
        season: "Spring or Fall",
        soil: "Loamy, well-drained soil with pH 6.0-7.5",
        watering: "Moderate, avoid waterlogging",
        growthDuration: "90-120 days",
      },
    },
    corn: {
      image: "/images/corn.jpg",
      description:
        "Corn is a versatile crop used for food, animal feed, and biofuel. It can be eaten fresh, ground into flour, or processed into various products.",
      nutrition: { fats: 5, proteins: 9, carbs: 74 },
      details: {
        season: "Late Spring to Early Summer",
        soil: "Fertile, well-drained soil with pH 5.8-7.0",
        watering: "Frequent, especially during flowering",
        growthDuration: "60-100 days",
      },
    },
  };

  return (
    <div className="mt-4 bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all">
      {/* Crop Selection */}
      <label className="text-gray-700 font-medium">Select Crop:</label>
      <select
        className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-green-400"
        value={selectedCrop}
        onChange={(e) => setSelectedCrop(e.target.value)}
      >
        <option value="wheat">Wheat</option>
        <option value="corn">Corn</option>
      </select>

      {/* Crop Image */}
      <img
        src={cropData[selectedCrop].image}
        alt={selectedCrop}
        className="w-full h-48 object-cover rounded-md mt-3"
      />

      {/* Crop Description */}
      <p className="mt-3 text-sm text-gray-600">{cropData[selectedCrop].description}</p>

      {/* Nutrition Facts */}
      <div className="mt-4 space-y-2">
        {Object.entries(cropData[selectedCrop].nutrition).map(([key, value]) => (
          <div key={key} className="text-sm">
            <div className="flex justify-between">
              <span className="capitalize text-gray-700">{key}</span>
              <span className="font-semibold">{value}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Plant Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-all"
      >
        Plant!
      </button>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold text-gray-800">
              {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} Details
            </h2>
            <ul className="mt-2 text-sm text-gray-600 space-y-2">
              <li><strong>Best Season:</strong> {cropData[selectedCrop].details.season}</li>
              <li><strong>Soil Type:</strong> {cropData[selectedCrop].details.soil}</li>
              <li><strong>Watering Needs:</strong> {cropData[selectedCrop].details.watering}</li>
              <li><strong>Growth Duration:</strong> {cropData[selectedCrop].details.growthDuration}</li>
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
