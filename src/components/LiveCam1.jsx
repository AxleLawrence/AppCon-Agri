import { useState, useEffect, useRef } from "react";

const LiveCamera = () => {
  const [devices, setDevices] = useState([]); // List of available cameras
  const [selectedDevice, setSelectedDevice] = useState(""); // Chosen camera
  const [isCameraOn, setIsCameraOn] = useState(false); // Camera on/off state
  const videoRef = useRef(null);
  let streamRef = useRef(null);

  // Fetch available cameras
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
      const videoDevices = deviceInfos.filter((device) => device.kind === "videoinput");
      setDevices(videoDevices);
      if (videoDevices.length > 0) setSelectedDevice(videoDevices[0].deviceId);
    });
  }, []);

  // Start/Stop Camera Stream
  useEffect(() => {
    if (!selectedDevice || !isCameraOn) {
      stopCamera(); // Stop the camera if turned off
      return;
    }

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
            width: { ideal: 1280 }, // Set ideal width resolution
            height: { ideal: 720 }, // Set ideal height resolution
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream; // Store stream reference to stop it later
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Error accessing the camera. Please check permissions.");
      }
    };
    

    startCamera();

    return () => stopCamera(); // Cleanup when component unmounts
  }, [selectedDevice, isCameraOn]);

  // Stop the camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  return (
    <div className="bg-gray-50 mt-2 p-4 rounded-xl shadow-md w-full flex flex-col md:flex-row items-center md:items-start gap-4">
      {/* Left Section: Camera Selection and Buttons */}
      <div className="w-full md:w-1/3 flex flex-col space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Camera:</label>
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={!isCameraOn} // Disable when camera is off
          >
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${devices.indexOf(device) + 1}`}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle Camera Button */}
        <button
          onClick={() => setIsCameraOn((prev) => !prev)}
          className={`px-6 py-2 rounded-lg shadow-md text-white font-semibold transition-all ${
            isCameraOn ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </button>
      </div>

      {/* Right Section: Live Camera Feed (Increased Height) */}
      <div className="w-full md:w-2/3 h-80 bg-black rounded-md flex items-center justify-center">
        {isCameraOn ? (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover rounded-md" />
        ) : (
          <p className="text-white">Camera Off</p>
        )}
      </div>
    </div>
  );
};

export default LiveCamera;
