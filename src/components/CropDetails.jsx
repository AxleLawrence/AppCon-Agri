import { useState } from "react";
import { motion } from "framer-motion";

const CropDetails = () => {
  const crops = [
    {
      name: "Wheat",
      description:
        "Raw wheat can be ground into flour or semolina. It can also be germinated, crushed, or steamed to create different products.",
      fats: "10%",
      proteins: "26%",
      carbs: "34%",
      bestConditions: "Temperatures between 10-25°C with moderate rainfall.",
      uses: "Used for making bread, pasta, cereals, and animal feed.",
      image: "/images/wheat.jpg",
    },
    {
      name: "Corn",
      description:
        "Corn is widely used as food, fodder, and biofuel. It is a staple crop in many countries.",
      fats: "4%",
      proteins: "10%",
      carbs: "74%",
      bestConditions: "Warm temperatures between 18-24°C with full sun exposure.",
      uses: "Used for tortillas, corn syrup, animal feed, and ethanol production.",
      image: "/images/corn.jpg",
    },
  ];

  const [selectedCrop, setSelectedCrop] = useState(crops[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl md:max-w-2xl mx-auto lg:mx-0 lg:ml-auto lg:mr-auto min-h-[50vh] md:min-h-[40vh] flex flex-col items-center justify-center">


      {/* Crop Selection */}
      <select
        className="w-full bg-gray-100 p-2 rounded-md mb-3"
        onChange={(e) => {
          const cropName = e.target.value;
          const foundCrop = crops.find((crop) => crop.name === cropName);
          setSelectedCrop(foundCrop);
          setImagePreview(null);
        }}
      >
        {crops.map((crop) => (
          <option key={crop.name} value={crop.name}>
            {crop.name}
          </option>
        ))}
      </select>

      {/* Crop Image */}
      <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
        <img
          src={imagePreview || selectedCrop.image}
          alt={selectedCrop.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Upload Image Button */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mt-2 text-sm"
      />

      {/* Crop Info */}
      <h2 className="text-lg font-semibold mt-4">{selectedCrop.name}</h2>
      <p className="text-sm text-gray-600">{selectedCrop.description}</p>

      {/* Nutritional Values */}
      <div className="flex justify-around mt-3">
        <div className="text-center">
          <p className="text-lg font-bold">{selectedCrop.fats}</p>
          <p className="text-sm text-gray-500">Fats</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{selectedCrop.proteins}</p>
          <p className="text-sm text-gray-500">Proteins</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{selectedCrop.carbs}</p>
          <p className="text-sm text-gray-500">Carbs</p>
        </div>
      </div>

      {/* Plant Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-all w-full"
      >
        Plant!
      </button>

      {/* Animated Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg mx-auto"
          >
            <h2 className="text-lg font-bold">{selectedCrop.name} - Details</h2>
            <p className="mt-2 text-sm">
              <strong>Best Growing Conditions:</strong> {selectedCrop.bestConditions}
            </p>
            <p className="mt-2 text-sm">
              <strong>Uses:</strong> {selectedCrop.uses}
            </p>

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CropDetails;
