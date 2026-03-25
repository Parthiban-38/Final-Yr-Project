import React, { useState } from "react";
import { speakFullPage } from "../utils/speakPage";

const cropRules = [
  { name: "Paddy", minTemp: 20, maxTemp: 35, minMoisture: 75, minHumidity: 70, fertilizer:"Urea + DAP", irrigation:"Standing water", tips:"Flooded fields" },
  { name: "Sugarcane", minTemp: 20, maxTemp: 38, minMoisture: 70, minHumidity: 60, fertilizer:"High nitrogen", irrigation:"Frequent", tips:"Long duration" },
  { name: "Banana", minTemp: 25, maxTemp: 40, minMoisture: 65, minHumidity: 60, fertilizer:"NPK", irrigation:"Drip", tips:"Warm climate" },
  { name: "Jute", minTemp: 25, maxTemp: 40, minMoisture: 75, minHumidity: 70, fertilizer:"Nitrogen", irrigation:"High water", tips:"Humid climate" },

  { name: "Wheat", minTemp: 10, maxTemp: 25, minMoisture: 40, minHumidity: 40, fertilizer:"Nitrogen", irrigation:"Moderate", tips:"Cool climate" },
  { name: "Maize", minTemp: 20, maxTemp: 35, minMoisture: 50, minHumidity: 50, fertilizer:"NPK", irrigation:"Moderate", tips:"Needs sunlight" },
  { name: "Barley", minTemp: 10, maxTemp: 25, minMoisture: 35, minHumidity: 40, fertilizer:"Nitrogen", irrigation:"Low", tips:"Short duration" },
  { name: "Soybean", minTemp: 20, maxTemp: 35, minMoisture: 45, minHumidity: 50, fertilizer:"Rhizobium", irrigation:"Moderate", tips:"Rotation crop" },
  { name: "Mustard", minTemp: 10, maxTemp: 25, minMoisture: 30, minHumidity: 40, fertilizer:"Sulfur", irrigation:"Low", tips:"Winter crop" },
  { name: "Sunflower", minTemp: 20, maxTemp: 35, minMoisture: 35, minHumidity: 40, fertilizer:"Phosphorus", irrigation:"Moderate", tips:"Oilseed" },
  { name: "Cotton", minTemp: 25, maxTemp: 40, minMoisture: 35, minHumidity: 40, fertilizer:"Potassium", irrigation:"Moderate", tips:"Avoid waterlogging" },
  { name: "Groundnut", minTemp: 20, maxTemp: 35, minMoisture: 30, minHumidity: 40, fertilizer:"Calcium", irrigation:"Light", tips:"Well-drained" },

  { name: "Tomato", minTemp: 20, maxTemp: 30, minMoisture: 50, minHumidity: 50, fertilizer:"NPK", irrigation:"Drip", tips:"Staking needed" },
  { name: "Potato", minTemp: 10, maxTemp: 25, minMoisture: 40, minHumidity: 40, fertilizer:"Potassium", irrigation:"Regular", tips:"Cool climate" },
  { name: "Onion", minTemp: 20, maxTemp: 35, minMoisture: 40, minHumidity: 50, fertilizer:"Nitrogen", irrigation:"Moderate", tips:"Dry after maturity" },
  { name: "Brinjal", minTemp: 25, maxTemp: 40, minMoisture: 50, minHumidity: 50, fertilizer:"Organic", irrigation:"Moderate", tips:"Warm crop" },
  { name: "Cabbage", minTemp: 10, maxTemp: 25, minMoisture: 50, minHumidity: 50, fertilizer:"Nitrogen", irrigation:"Regular", tips:"Cool crop" },
  { name: "Cauliflower", minTemp: 10, maxTemp: 25, minMoisture: 50, minHumidity: 50, fertilizer:"Balanced", irrigation:"Moderate", tips:"Winter crop" },
  { name: "Carrot", minTemp: 10, maxTemp: 25, minMoisture: 40, minHumidity: 40, fertilizer:"Potassium", irrigation:"Light", tips:"Loose soil" },
  { name: "Beans", minTemp: 20, maxTemp: 35, minMoisture: 40, minHumidity: 50, fertilizer:"Phosphorus", irrigation:"Moderate", tips:"Climber" },
  { name: "Okra", minTemp: 25, maxTemp: 40, minMoisture: 40, minHumidity: 50, fertilizer:"Nitrogen", irrigation:"Moderate", tips:"Warm crop" },

  { name: "Ragi", minTemp: 25, maxTemp: 40, minMoisture: 30, minHumidity: 40, fertilizer:"Organic", irrigation:"Low", tips:"Drought resistant" },
  { name: "Bajra", minTemp: 25, maxTemp: 40, minMoisture: 25, minHumidity: 30, fertilizer:"Manure", irrigation:"Minimal", tips:"Dry land" },
  { name: "Jowar", minTemp: 25, maxTemp: 40, minMoisture: 30, minHumidity: 40, fertilizer:"Nitrogen", irrigation:"Low", tips:"Heat resistant" },
  { name: "Toor Dal", minTemp: 25, maxTemp: 35, minMoisture: 30, minHumidity: 40, fertilizer:"Phosphorus", irrigation:"Low", tips:"Pulse crop" },
  { name: "Urad Dal", minTemp: 25, maxTemp: 35, minMoisture: 30, minHumidity: 40, fertilizer:"Organic", irrigation:"Low", tips:"Short duration" },
  { name: "Moong Dal", minTemp: 25, maxTemp: 35, minMoisture: 30, minHumidity: 40, fertilizer:"Nitrogen fixing", irrigation:"Low", tips:"Fast growth" },
  { name: "Chickpea", minTemp: 10, maxTemp: 25, minMoisture: 30, minHumidity: 40, fertilizer:"Phosphorus", irrigation:"Low", tips:"Winter crop" },

  { name: "Mango", minTemp: 25, maxTemp: 40, minMoisture: 40, minHumidity: 50, fertilizer:"Organic", irrigation:"Moderate", tips:"Seasonal fruit" },
  { name: "Papaya", minTemp: 25, maxTemp: 40, minMoisture: 50, minHumidity: 60, fertilizer:"NPK", irrigation:"Regular", tips:"Fast growth" },
  { name: "Guava", minTemp: 20, maxTemp: 35, minMoisture: 40, minHumidity: 50, fertilizer:"Manure", irrigation:"Moderate", tips:"Hardy" },

  { name: "Coconut", minTemp: 25, maxTemp: 40, minMoisture: 60, minHumidity: 70, fertilizer:"Organic", irrigation:"Regular", tips:"Tropical" },
  { name: "Tea", minTemp: 20, maxTemp: 30, minMoisture: 70, minHumidity: 80, fertilizer:"Nitrogen", irrigation:"High rainfall", tips:"Hill crop" },
  { name: "Coffee", minTemp: 20, maxTemp: 30, minMoisture: 60, minHumidity: 70, fertilizer:"Compost", irrigation:"Moderate", tips:"Shade crop" },
  { name: "Rubber", minTemp: 25, maxTemp: 35, minMoisture: 70, minHumidity: 80, fertilizer:"Balanced", irrigation:"High rainfall", tips:"Humid climate" }
];

export default function Recommender() {
  const [step, setStep] = useState(1);
  const [landType, setLandType] = useState("");
  const [soil, setSoil] = useState("");
  const [cropInput, setCropInput] = useState("");
  const [results, setResults] = useState([]);

  const temp = 28;
  const moisture = 65;
  const humidity = 60;

  const handleSoilRecommend = () => {
    if (soil === "red") setResults(["🌾 Groundnut, Ragi"]);
    else if (soil === "black") setResults(["🌾 Cotton, Soybean"]);
    else if (soil === "sandy") setResults(["🌾 Coconut"]);
    else if (soil === "clay") setResults(["🌾 Paddy, Jute"]);
  };

  const handleCropCheck = () => {
    const crop = cropRules.find(c =>
      c.name.toLowerCase().includes(cropInput.toLowerCase())
    );

    if (!crop) {
      setResults(["❌ Crop not found"]);
      return;
    }

    let suggestions = [];

    if (temp < crop.minTemp) suggestions.push("🌡 Increase temperature");
    if (temp > crop.maxTemp) suggestions.push("🌡 Reduce heat / provide shade");
    if (moisture < crop.minMoisture) suggestions.push("💧 Increase irrigation");
    if (humidity < crop.minHumidity) suggestions.push("🌫 Increase humidity");

    const isSuitable =
      temp >= crop.minTemp &&
      temp <= crop.maxTemp &&
      moisture >= crop.minMoisture &&
      humidity >= crop.minHumidity;

    if (isSuitable) {
      setResults([`✅ Suitable for ${crop.name}`]);
    } else {
      setResults([`⚠️ ${crop.name} not suitable`, "👉 Fix:", ...suggestions]);
    }
  };

  return (
    <div id="recommendation-page" style={{ padding: "20px" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h1>🌾 Smart Crop Recommender</h1>

  <button onClick={() => speakFullPage("recommendation-page")}>
    🔊
  </button>
</div>

      {step === 1 && (
        <div>
          <button onClick={() => { setLandType("empty"); setStep(2); }}>🌱 Empty Land</button>
          <button onClick={() => { setLandType("sown"); setStep(2); }}>🌾 Seed Sown</button>
        </div>
      )}

      {step === 2 && landType === "empty" && (
        <div>
          <h2>Select Soil</h2>
          <select onChange={(e) => setSoil(e.target.value)}>
            <option>Select</option>
            <option value="red">Red</option>
            <option value="black">Black</option>
            <option value="sandy">Sandy</option>
            <option value="clay">Clay</option>
          </select>
          <button onClick={handleSoilRecommend}>Recommend</button>
        </div>
      )}

      {step === 2 && landType === "sown" && (
        <div>
          <h2>Crop Check</h2>
          <input value={cropInput} onChange={(e) => setCropInput(e.target.value)} />
          <button onClick={handleCropCheck}>Check</button>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        {results.map((r, i) => <p key={i}>{r}</p>)}
      </div>
    </div>
  );
}