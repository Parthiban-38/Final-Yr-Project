import React, { useState, useEffect } from "react";

const cropRules = [
  { name: "Paddy", minTemp: 20, maxTemp: 35, minMoisture: 75, minHumidity: 70, fertilizer:"Urea + DAP", irrigation:"Standing water", tips:"Flooded fields" },
  { name: "Wheat", minTemp: 10, maxTemp: 25, minMoisture: 40, minHumidity: 40, fertilizer:"Nitrogen", irrigation:"Moderate", tips:"Cool climate" },
  { name: "Maize", minTemp: 20, maxTemp: 35, minMoisture: 50, minHumidity: 50, fertilizer:"NPK", irrigation:"Moderate", tips:"Needs sunlight" },
  { name: "Tomato", minTemp: 20, maxTemp: 30, minMoisture: 50, minHumidity: 50, fertilizer:"NPK", irrigation:"Drip", tips:"Use staking" },
  { name: "Potato", minTemp: 10, maxTemp: 25, minMoisture: 40, minHumidity: 40, fertilizer:"Potassium", irrigation:"Regular", tips:"Cool climate" },
  { name: "Cotton", minTemp: 25, maxTemp: 40, minMoisture: 35, minHumidity: 40, fertilizer:"Potassium", irrigation:"Moderate", tips:"Avoid waterlogging" }
];

function Recommender() {

  // Sensor data (auto)
  const [temp, setTemp] = useState(0);
  const [moisture, setMoisture] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const [cropInput, setCropInput] = useState("");
  const [result, setResult] = useState(null);

  // 🔥 Simulated sensor (later Firebase / API connect pannalam)
  useEffect(() => {
    setTemp(28);        // sensor temp
    setMoisture(65);    // soil moisture
    setHumidity(60);    // humidity
  }, []);

  const handleCheck = () => {
    const crop = cropRules.find(c =>
      c.name.toLowerCase() === cropInput.toLowerCase()
    );

    if (!crop) {
      setResult({ status: "notfound" });
      return;
    }

    // Condition check
    if (
      temp >= crop.minTemp &&
      temp <= crop.maxTemp &&
      moisture >= crop.minMoisture &&
      humidity >= crop.minHumidity
    ) {
      setResult({ status: "good", crop });
    } else {
      setResult({ status: "bad", crop });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌾 Smart Crop Checker (Sensor Based)</h1>

      {/* Sensor Data Display */}
      <h3>📡 Live Sensor Data</h3>
      <p>🌡 Temperature: {temp}°C</p>
      <p>💧 Soil Moisture: {moisture}%</p>
      <p>🌫 Humidity: {humidity}%</p>

      <br />

      {/* Crop Input */}
      <input
        type="text"
        placeholder="Enter Crop Name"
        value={cropInput}
        onChange={(e) => setCropInput(e.target.value)}
      />

      <button onClick={handleCheck}>Check Suitability</button>

      {/* Result */}
      <div>
        {result && result.status === "notfound" && (
          <p>❌ Crop not found</p>
        )}

        {result && result.status === "good" && (
          <div style={{ border: "1px solid green", padding: "10px", margin: "10px" }}>
            <h2>✅ Suitable for {result.crop.name}</h2>
            <p>🧪 Fertilizer: {result.crop.fertilizer}</p>
            <p>🚿 Irrigation: {result.crop.irrigation}</p>
            <p>💡 Tips: {result.crop.tips}</p>
          </div>
        )}

        {result && result.status === "bad" && (
          <div style={{ border: "1px solid red", padding: "10px", margin: "10px" }}>
            <h2>⚠️ Not Suitable for {result.crop.name}</h2>
            <p>Try adjusting conditions</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommender;