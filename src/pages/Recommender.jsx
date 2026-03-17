import React, { useState } from "react";

const cropData = {
  paddy: {
    fertilizer: "Use Urea + DAP at early stage",
    irrigation: "Maintain standing water (2-5 cm)",
    tips: "Use short-duration variety for better yield"
  },
  wheat: {
    fertilizer: "Nitrogen rich fertilizer recommended",
    irrigation: "Irrigate at CRI and flowering stage",h
    tips: "Avoid over irrigation"
  },
  tomato: {
    fertilizer: "Use NPK (10:10:10)",
    irrigation: "Drip irrigation preferred",
    tips: "Use staking for better growth"
  },
  corn: {
    fertilizer: "Apply Nitrogen in split doses",
    irrigation: "Irrigate at tasseling stage",
    tips: "Ensure proper spacing"
  },
  ragi: {
    fertilizer: "Organic manure preferred",
    irrigation: "Less water required",
    tips: "Drought resistant crop"
  },
  kambu: {
    fertilizer: "Farmyard manure recommended",
    irrigation: "Minimal irrigation needed",
    tips: "Grows well in dry land"
  }
};

function Recommender() {
  const [crop, setCrop] = useState("");
  const [result, setResult] = useState(null);

  const handleRecommend = () => {
    const data = cropData[crop.toLowerCase()];
    if (data) {
      setResult(data);
    } else {
      setResult({
        fertilizer: "No data available",
        irrigation: "No data available",
        tips: "Try another crop"
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🌾 Crop Recommender System</h2>

      <input
        type="text"
        placeholder="Enter crop (paddy, wheat...)"
        value={crop}
        onChange={(e) => setCrop(e.target.value)}
      />

      <button onClick={handleRecommend} style={{ marginLeft: "10px" }}>
        Get Recommendation
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>📊 Recommendations:</h3>
          <p><b>Fertilizer:</b> {result.fertilizer}</p>
          <p><b>Irrigation:</b> {result.irrigation}</p>
          <p><b>Tips:</b> {result.tips}</p>
        </div>
      )}
    </div>
  );
}

export default Recommender;