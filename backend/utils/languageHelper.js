/* 🌱 CONDITION DETECTION */
function getConditions(data) {
  const conditions = [];

  if (data.temp >= 35) conditions.push("HOT");
  else if (data.temp <= 20) conditions.push("COLD");
  else conditions.push("NORMAL_TEMP");

  if (data.humidity < 40) conditions.push("DRY");
  else if (data.humidity > 75) conditions.push("WET");
  else conditions.push("NORMAL_HUMIDITY");

  if (data.windSpeed > 20) conditions.push("WINDY");

  if (data.soilMoisture < 30) conditions.push("DRY_SOIL");
  else if (data.soilMoisture > 70) conditions.push("WET_SOIL");

  return conditions;
}

/* 🌍 CONDITION MAP (Tamil) */
const conditionMap = {
  HOT: "வெப்பம் அதிகம்",
  COLD: "குளிர் அதிகம்",
  DRY: "உலர் நிலை",
  WET: "ஈரப்பதம் அதிகம்",
  DRY_SOIL: "மண் உலர்",
  WET_SOIL: "மண் ஈரம்",
  WINDY: "காற்று அதிகம்",
  NORMAL_TEMP: "சாதாரண வெப்பம்",
  NORMAL_HUMIDITY: "சாதாரண ஈரம்"
};

/* 💡 RECOMMENDATION MAP */
const recommendationMap = {
  HOT: "நீர் அதிகரிக்கவும்",
  COLD: "பயிர் பாதுகாக்கவும்",
  DRY: "நீர் விடவும்",
  DRY_SOIL: "உடனே நீர் விடவும்",
  WET: "நீர் தவிர்க்கவும்",
  WET_SOIL: "நீர் வேண்டாம்",
  WINDY: "தெளிப்பு வேண்டாம்"
};

/* 🧠 FULL RECOMMENDATION */
function generateRecommendation(conditions, lang) {
  let rec = [];

  if (conditions.includes("HOT")) {
    rec.push({
      en: "High temperature. Increase irrigation.",
      ta: "அதிக வெப்பம். நீர் அதிகரிக்கவும்."
    });
  }

  if (conditions.includes("COLD")) {
    rec.push({
      en: "Low temperature. Protect crops.",
      ta: "குளிர் அதிகம். பயிர் பாதுகாக்கவும்."
    });
  }

  if (conditions.includes("DRY") || conditions.includes("DRY_SOIL")) {
    rec.push({
      en: "Dry soil. Irrigate now.",
      ta: "மண் உலர். உடனே நீர் விடவும்."
    });
  }

  if (conditions.includes("WET") || conditions.includes("WET_SOIL")) {
    rec.push({
      en: "High moisture. Avoid watering.",
      ta: "ஈரம் அதிகம். நீர் விட வேண்டாம்."
    });
  }

  if (conditions.includes("WINDY")) {
    rec.push({
      en: "Windy. Avoid spraying.",
      ta: "காற்று அதிகம். தெளிப்பு வேண்டாம்."
    });
  }

  if (rec.length === 0) {
    rec.push({
      en: "All normal.",
      ta: "எல்லாம் சாதாரணம்."
    });
  }

  return rec.map(r => r[lang]).join("\n");
}

/* 📊 WHATSAPP FULL REPORT */
function generateReport(data, lang = "ta") {
  const conditions = getConditions(data);
  const recommendation = generateRecommendation(conditions, lang);

  if (lang === "en") {
    return `Daily Report
Temp:${data.temp}C Hum:${data.humidity}%
Soil:${data.soilMoisture}% Wind:${data.windSpeed}

Conditions:
${conditions.join(",")}

Recommendation:
${recommendation}`;
  }

  return `📊 *தினசரி விவசாய அறிக்கை*

🌡️ வெப்பநிலை: ${data.temp}°C
💧 ஈரப்பதம்: ${data.humidity}%
🌱 மண் ஈரம்: ${data.soilMoisture}%
🌬️ காற்று: ${data.windSpeed}

📌 நிலை:
${conditions.map(c => "👉 " + conditionMap[c]).join("\n")}

✅ பரிந்துரை:
${recommendation}`;
}

/* 📱 SHORT SMS (Tamil + Recommendation) */
function generateShortSMS(data, lang = "ta") {
  const conditions = getConditions(data);

  const priority = ["DRY_SOIL", "HOT", "DRY", "WET"];
  const mainCondition =
    conditions.find(c => priority.includes(c)) || conditions[0];

  if (lang === "ta") {
    return `🌾 விவசாயம்
🌡️${data.temp}°C 💧${data.humidity}% 🌱${data.soilMoisture}%
⚠️ ${conditionMap[mainCondition]}
👉 ${recommendationMap[mainCondition] || "சாதாரணம்"}`;
  }

  return `Farm
T:${data.temp} H:${data.humidity} Soil:${data.soilMoisture}
${mainCondition}`;
}

/* 📤 EXPORT */
module.exports = {
  generateReport,
  generateShortSMS
};