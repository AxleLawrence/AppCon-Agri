import { useState, useEffect, useRef } from "react";

const FieldMap = () => {
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
          video: { deviceId: selectedDevice ? { exact: selectedDevice } : undefined },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream; // Store stream reference to stop it later
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    return () => stopCamera(); // Cleanup when component unmounts
  }, [selectedDevice, isCameraOn]);

  // Stop the camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-md w-full">
      {/* Camera Selection */}
      <label className="block text-gray-700 text-sm font-bold mb-2">Select Camera:</label>
      <select
        value={selectedDevice}
        onChange={(e) => setSelectedDevice(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
        disabled={!isCameraOn} // Disable when camera is off
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${devices.indexOf(device) + 1}`}
          </option>
        ))}
      </select>

      {/* Live Camera Feed (Increased Height) */}
      <div className="relative w-full h-96 bg-black rounded-md flex items-center justify-center">
        {isCameraOn ? (
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-md" />
        ) : (
          <p className="text-white">Camera Off</p>
        )}
      </div>

      {/* Toggle Camera Button */}
      <button
        onClick={() => setIsCameraOn((prev) => !prev)}
        className={`mt-4 px-6 py-2 rounded-lg shadow-md text-white font-semibold transition-all ${
          isCameraOn ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
      </button>
    </div>
  );
};

export default FieldMap;
