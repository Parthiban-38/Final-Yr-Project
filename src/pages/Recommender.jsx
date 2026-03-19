import React, { useState, useEffect } from "react";

export default function Recommender() {
  const [step, setStep] = useState(1);
  const [landType, setLandType] = useState("");
  const [soil, setSoil] = useState("");
  const [cropInput, setCropInput] = useState("");
  const [result, setResult] = useState("");

  // 🌡 Simulated sensor data
  const [temp] = useState(28);
  const [moisture] = useState(65);
  const [humidity] = useState(60);

  // 🌱 Soil Recommendation
  const handleSoilRecommend = () => {
    if (soil === "red") {
      setResult("🌾 Suitable crops: Groundnut, Millets");
    } else if (soil === "black") {
      setResult("🌾 Suitable crops: Cotton, Soybean");
    } else if (soil === "sandy") {
      setResult("🌾 Suitable crops: Coconut, Watermelon");
    } else if (soil === "clay") {
      setResult("🌾 Suitable crops: Paddy, Jute");
    }
  };

  // 🌾 Crop Check
  const handleCropCheck = () => {
    if (cropInput.toLowerCase() === "paddy" && moisture > 70) {
      setResult("✅ Suitable for Paddy");
    } else {
      setResult("⚠️ Not Suitable / Check conditions");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🌾 Smart Agriculture Assistant</h1>

      {/* STEP 1 */}
      {step === 1 && (
        <div>
          <h2>Select Land Status</h2>
          <button onClick={() => { setLandType("empty"); setStep(2); }}>
            🌱 Empty Land
          </button>

          <button onClick={() => { setLandType("sown"); setStep(2); }} style={{ marginLeft: "10px" }}>
            🌾 Seed Sown
          </button>
        </div>
      )}

      {/* STEP 2 - EMPTY LAND */}
      {step === 2 && landType === "empty" && (
        <div>
          <h2>🌱 Select Soil Type</h2>

          <select onChange={(e) => setSoil(e.target.value)}>
            <option value="">Select Soil</option>
            <option value="red">Red Soil</option>
            <option value="black">Black Soil</option>
            <option value="sandy">Sandy Soil</option>
            <option value="clay">Clay Soil</option>
          </select>

          <br /><br />

          <button onClick={handleSoilRecommend}>Get Recommendation</button>
        </div>
      )}

      {/* STEP 2 - SEED SOWN */}
      {step === 2 && landType === "sown" && (
        <div>
          <h2>🌾 Crop Suitability Check</h2>

          <p>🌡 Temp: {temp}°C | 💧 Moisture: {moisture}% | 🌫 Humidity: {humidity}%</p>

          <input
            placeholder="Enter crop name"
            value={cropInput}
            onChange={(e) => setCropInput(e.target.value)}
          />

          <button onClick={handleCropCheck}>Check</button>
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid gray" }}>
          <h2>Result</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}