import React, { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
>>>>>>> 481b934513125c867aa08ae2c6b06fb89db46cf8

const cropRules = [
  { name: "Paddy", minTemp: 20, maxTemp: 35, minMoisture: 75, minHumidity: 70, fertilizer:"Urea + DAP", irrigation:"Standing water", tips:"Flooded fields" },
  { name: "Wheat", minTemp: 10, maxTemp: 25, minMoisture: 40, minHumidity: 40, fertilizer:"Nitrogen", irrigation:"Moderate", tips:"Cool climate" },
  { name: "Maize", minTemp: 20, maxTemp: 35, minMoisture: 50, minHumidity: 50, fertilizer:"NPK", irrigation:"Moderate", tips:"Needs sunlight" },
  { name: "Tomato", minTemp: 20, maxTemp: 30, minMoisture: 50, minHumidity: 50, fertilizer:"NPK", irrigation:"Drip", tips:"Use staking" },
  { name: "Potato", minTemp: 10, maxTemp: 25, minMoisture: 40, minHumidity: 40, fertilizer:"Potassium", irrigation:"Regular", tips:"Cool climate" },
  { name: "Cotton", minTemp: 25, maxTemp: 40, minMoisture: 35, minHumidity: 40, fertilizer:"Potassium", irrigation:"Moderate", tips:"Avoid waterlogging" }
];

<<<<<<< HEAD
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
=======
export default function Recommender() {
  const [temp, setTemp] = useState("");
  const [moisture, setMoisture] = useState("");
  const [results, setResults] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live date/time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRecommend = () => {
    const t = Number(temp);
    const m = Number(moisture);
    const matched = cropRules.filter((crop) => crop.condition(t, m));
    setResults(matched);
  };

  return (
    <div style={{ padding: "20px", minHeight: "100vh", background: "linear-gradient(135deg,#e8f5e9,#e3f2fd)" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" }}>
        <h1>🌾 Crop Recommender</h1>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            {currentTime.toLocaleString([], { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </div>
          <div style={{ marginTop: "5px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <Link to="/dashboard">
              <button style={{ padding: "8px 14px", background: "#2196f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                ← Dashboard
              </button>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* INPUTS */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
        <input
          type="number"
          placeholder="Temperature"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="number"
          placeholder="Soil Moisture"
          value={moisture}
          onChange={(e) => setMoisture(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleRecommend}
          style={{ padding: "8px 15px", background: "#4caf50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Recommend
        </button>
      </div>

      {/* RESULTS */}
      <div>
        {results.length === 0 ? (
          <p>No crops found</p>
        ) : (
          results.map((crop, index) => (
            <div key={index} style={{ border: "1px solid gray", margin: "10px 0", padding: "10px", borderRadius: "8px", background: "white", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
              <h2>{crop.name}</h2>
              <p>🌱 Fertilizer: {crop.data.fertilizer}</p>
              <p>💧 Irrigation: {crop.data.irrigation}</p>
              <p>💡 Tips: {crop.data.tips}</p>
            </div>
          ))
>>>>>>> 481b934513125c867aa08ae2c6b06fb89db46cf8
        )}
      </div>
    </div>
  );
}